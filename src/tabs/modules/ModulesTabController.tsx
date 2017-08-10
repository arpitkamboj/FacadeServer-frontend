import {TextPromptDialog} from "../../TextPromptDialog";
import {TabController} from "../TabController";
import {ModulesTabState} from "./ModulesTabState";

export class ModulesTabController extends TabController<ModulesTabState> {

  public installModules = (moduleIds: string[]) => {
    this.model.requestResource({action: "WRITE", resourceName: "moduleInstaller", data: moduleIds});
  }

}