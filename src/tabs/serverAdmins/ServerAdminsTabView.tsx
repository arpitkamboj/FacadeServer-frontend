import RX = require("reactxp");
import Styles = require("../../styles/main");
import {OkCancelButtonBar} from "../../OkCancelButtonBar";
import {TextPromptDialog} from "../../TextPromptDialog";
import {TabView} from "../TabView";
import {ServerAdminsTabController} from "./ServerAdminsTabController";
import {ServerAdminMetadata, ServerAdminsTabState} from "./ServerAdminsTabState";

export class ServerAdminsTabView extends TabView<ServerAdminsTabState> {

  public render() {
    const emptyListMessage = "The admin list is empty - WARNING: access to administrative settings is public! " +
      "Please create a savegame using the Games tab and start it, then connect to the server using the regular Terasology game client " +
      "to restrict the admin privileges to your identity. Alternatively, you can manually add IDs to the admin list using the button " +
      "below. Note, however, that if you add a string which is not the client ID obtained from a certificate generated by the server " +
      "you will get locked out from the administrative features. If this happens, delete the serverAdmins.json file in the server data" +
      "directory and restart the server (admin access will be set back to public).";
    const controller: ServerAdminsTabController = this.props.model.getController() as ServerAdminsTabController;
    const showAddAdminDialog = () => TextPromptDialog.show("Enter the new admin's client ID:", controller.addAdmin);
    return (
      <RX.View>
        <RX.View style={Styles.flex.row}>
          <RX.Button style={Styles.okButton} onPress={showAddAdminDialog}><RX.Text>Add a client ID to the admin list</RX.Text></RX.Button>
          <RX.Button style={Styles.okButton}><RX.Text>Select an online player to add to the admin list</RX.Text></RX.Button>
        </RX.View>
        {this.state.admins.length === 0 ? <RX.Text>{emptyListMessage}</RX.Text> : this.renderList(this.renderAdmin(controller))}
      </RX.View>
    );
  }

  private renderList(renderAdmin: (admin: ServerAdminMetadata) => JSX.Element) {
    return (
      <RX.View>
        <RX.Text>This is the list of the user IDs which are allowed to perform administrative actions:</RX.Text>
        <RX.View>
          {this.state.admins.map(renderAdmin)}
        </RX.View>
      </RX.View>
    );
  }

  private renderAdmin = (controller: ServerAdminsTabController) => (admin: ServerAdminMetadata) => {
    return (
      <RX.View key={admin.id} style={Styles.flex.row}>
        <RX.View>
          <RX.Text>{admin.id}</RX.Text>
          <RX.Text>{admin.name !== null ? "Currently online as " + admin.name : "Currently offline"}</RX.Text>
        </RX.View>
        <RX.Button style={Styles.cancelButton} onPress={() => controller.removeAdmin(admin.id)}><RX.Text>Remove</RX.Text></RX.Button>
      </RX.View>
    );
  }

}
