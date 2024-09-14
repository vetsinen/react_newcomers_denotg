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
     const userid: number = message.new_chat_participant.id
     const chatid: number = message.chat.id
     console.log(userid)
     console.log(message)
     await ctx.api.sendMessage(chatid, `доброго дня, ${message.new_chat_participant.first_name}. через велику кількість спам-акаунтів в телеграмі нові акаунти в цьому чату переводяться в режим тільки читання на 3 дні. якщо ви жива людина - напишіть в приват боту і обмеження будуть зняті`);

     //Mute the target user
     const muteDurationSeconds = 60 * 240;
     // Calculate the mute end time as a Unix timestamp
     const untilDate = Math.floor(Date.now() / 1000) + muteDurationSeconds

     await ctx.api.restrictChatMember(chatid, userid, {
          permissions: {
               can_send_messages: false, // Disable sending messages
               can_send_media_messages: false,
               can_send_polls: false,
               can_send_other_messages: false,
               can_add_web_page_previews: false,
               can_change_info: false,
               can_invite_users: false,
               can_pin_messages: false,
          },
          until_date: untilDate,
     })

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