import * as React from 'react';
import {
    PrimaryButton,
    TeamsComponentContext,
    ConnectedComponent,
    Panel,
    PanelBody,
    PanelHeader,
    PanelFooter,
    Surface
} from 'msteams-ui-components-react';
import { render } from 'react-dom';
import { TeamsBaseComponent, ITeamsBaseComponentProps, ITeamsBaseComponentState } from './TeamsBaseComponent'

/**
 * State for the idev10TabTab React component
 */
export interface Iidev10TabTabState extends ITeamsBaseComponentState {
    entityId?: string;
}

/**
 * Properties for the idev10TabTab React component
 */
export interface Iidev10TabTabProps extends ITeamsBaseComponentProps {

}

/**
 * Implementation of the idev10 Tab content page
 */
export class idev10TabTab extends TeamsBaseComponent<Iidev10TabTabProps, Iidev10TabTabState> {
 
    public refresh() {
        let graphElement = document.getElementById("graph");
        graphElement!.innerText = "Loading profile...";

        microsoftTeams.authentication.authenticate({
            url: "/auth.html",
            width: 700,
            height: 500,
            successCallback: (data) => {

              let graphEndpoint = "https://graph.microsoft.com/v1.0/me";
              
              var req = new XMLHttpRequest();
              req.open("GET", graphEndpoint, false);
              req.setRequestHeader("Authorization", "Bearer " + data);
              req.setRequestHeader("Accept", "application/json;odata.metadata=minimal;");
              req.send();
              
              var result = JSON.parse(req.responseText);
              
              document.getElementById("graph")!.innerHTML = `<table><tr><td>Name</td><td>${result.displayName}<//td></tr><tr><td>Job</td><td>${result.jobTitle}<//td></tr><tr><td>Location</td><td>${result.officeLocation}<//td></tr></table>`;
            },
            failureCallback: function (err) {
              document.getElementById("graph")!.innerHTML = "Failed to authenticate and get token.<br/>" + err;
            }
          });
      }

    public componentWillMount() {
        this.updateTheme(this.getQueryVariable('theme'));
        this.setState({
            fontSize: this.pageFontSize()
        });

        if (this.inTeams()) {
            microsoftTeams.initialize();
            microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
            microsoftTeams.getContext(context => {
                this.setState({
                    entityId: context.entityId
                });
            });
        } else {
            this.setState({
                entityId: "This is not hosted in Microsoft Teams"
            });
        }
    }

    /** 
     * The render() method to create the UI of the tab
     */
    public render() {
        return (
            <TeamsComponentContext
                fontSize={this.state.fontSize}
                theme={this.state.theme}
            >

                <ConnectedComponent render={(props) => {
                    const { context } = props;
                    const { rem, font } = context;
                    const { sizes, weights } = font;
                    const styles = {
                        header: { ...sizes.title, ...weights.semibold },
                        section: { ...sizes.base, marginTop: rem(1.4), marginBottom: rem(1.4) },
                        footer: { ...sizes.xsmall }
                    }

                    return (
                        <Surface>
                            <Panel>
                                <PanelHeader>
                                    <div style={styles.header}>This is your tab</div>
                                </PanelHeader>
                                <PanelBody>
                                    <div style={styles.section}>
                                        {this.state.entityId}
                                    </div>
                                    <div style={styles.section}>
                                        <PrimaryButton onClick={ this.refresh }>Refresh</PrimaryButton>
                                    </div>
                                </PanelBody>
                                <PanelFooter>
                                    <div style={styles.footer}>
                                        (C) Copyright Contoso
                                    </div>
                                </PanelFooter>
                            </Panel>
                        </Surface>
                    );
                }}>
                </ConnectedComponent>
            </TeamsComponentContext >
        );
    }
}