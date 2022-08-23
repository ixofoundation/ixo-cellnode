import { AbstractHandler } from "../../handlers/AbstractHandler";
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from "../../../logger/Logger";
import Cache from "../../../Cache";
import xss from "../../../Xss";
import { BlockchainMode } from "../common/shared";

export class CreateAgentProcessor extends AbstractHandler {
    handleAsyncCreateAgentResponse = (jsonResponseMsg: any, retries?: number) => {

    };
};