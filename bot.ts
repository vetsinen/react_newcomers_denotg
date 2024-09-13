import { Bot, config } from "./deno.deps.ts";

let botToken = Deno.env.get("TGTOKEN");
if (!botToken) {
     console.log("Deno Environment variable 'TGTOKEN' not found.");
     const env = await config();
     botToken = env.TGTOKEN
    //Deno.exit()
}
console.log("Your bot token is:", botToken);

const bot = new Bot(botToken);// <-- put your bot token between the "" (https://t.me/BotFather)
// Define a handler for new chat members
bot.on("message:new_chat_members", async (ctx) => {
     // Extract the new members
     const message = ctx.message;
     console.log(message.chat.id)
     console.log(message.new_chat_participant.id)
     console.log(message)
     await ctx.api.sendMessage(message.chat.id, `Hello, ${message.new_chat_participant.first_name}. welcome to chat`);

     // Mute the target user
     // await bot.restrictChatMember(chatId, targetUserId, {
     //      until_date: Date.now() + 60 * 60 * 24 * 365, // Mute for a year
     // });
     // // Construct a welcome message
     // const welcomeMessage = newMembers
     //     .map((member) => `Welcome ${member.first_name} to the group!`)
     //     .join("\n");
     //
     // // Send the welcome message
     // ctx.reply(welcomeMessage);
});

//bot.on("message", (ctx) => ctx.reply("start for deno tgbot!"));
bot.start();