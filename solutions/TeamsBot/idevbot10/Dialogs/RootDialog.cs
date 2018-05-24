using System;
using System.Threading.Tasks;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Connector;
using System.Collections.Generic;

namespace idevbot10.Dialogs
{
    [Serializable]
    public class RootDialog : IDialog<object>
    {
        public Task StartAsync(IDialogContext context)
        {
            context.Wait(MessageReceivedAsync);

            return Task.CompletedTask;
        }

        private async Task MessageReceivedAsync(IDialogContext context, IAwaitable<object> result)
        {
            var activity = await result as Activity;

            IMessageActivity replyMessage = context.MakeMessage();

            replyMessage.Attachments = new List<Attachment>();

            // generate placeholder, mocked search results
            var mockedSearchResults = activity.Text.Split(' ', '.', ';', ':');
            var searchResults = String.Empty;
            foreach (String specificResult in mockedSearchResults)
            {
                if (!specificResult.Contains("earch") && !specificResult.Contains("bot"))
                {
                    if (searchResults.Length > 0)
                    {
                        searchResults += ", ";
                    }
                    searchResults += specificResult;
                }
            }


            HeroCard heroCard = new HeroCard
            {
                Title = "Contoso Search Results",
                Subtitle = "Searching across Contoso Travel potential adventures:",
                Text = "Here are more search results around '" + activity.Text + "':    " + searchResults,
                Images = new List<CardImage> { new CardImage("https://spawesome.blob.core.windows.net/contoso/adventuremanagement.jpg") },
                Buttons = new List<CardAction> { new CardAction(ActionTypes.OpenUrl, "Open Results Page", value: "https://docs.microsoft.com/bot-framework") }
            };

            replyMessage.Attachments.Add(heroCard.ToAttachment());

            await context.PostAsync(replyMessage);

            context.Wait(MessageReceivedAsync);

        }
    }
}