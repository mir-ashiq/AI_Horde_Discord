import {Colors, EmbedBuilder, ModalSubmitInteraction} from "discord.js";
import { BaseContext } from "./baseContext";
import {ModalContextInitOptions} from "../types";

export class ModalContext extends BaseContext {
    override interaction: ModalSubmitInteraction
    constructor(options: ModalContextInitOptions) {
        super(options)
        this.interaction = options.interaction
    }

    async error(options: { content?: string, error_key?: string, ephemeral?: boolean, codeblock?: boolean, type?: "user" | "guild", args?: string[] }) {
        const err_string = options.content ?? "Unknown Error"
        const embed = new EmbedBuilder({
            color: Colors.Red,
            description: `❌ **Error** | ${(options.codeblock ?? true) ? `\`${err_string}\`` : err_string}`
        })
        if(this.interaction.replied || this.interaction.deferred) return await this.interaction.editReply({embeds: [embed]})
        else return await this.interaction.reply({embeds: [embed], ephemeral: options.ephemeral ?? true})
    }
}