import type {
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { INotificationModuleService } from "@medusajs/framework/types"

export default async function productCreateHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }>) {
    const notificationModuleService: INotificationModuleService = container.resolve(Modules.NOTIFICATION)

//@ts-ignore
    await notificationModuleService.createNotifications({
        to: "zeeshanmehdi.dev@gmail.com",
        from: process.env.SENDGRID_FROM, // Optional var, verified sender required
        channel: "email",
        template: process.env.SENDGRID_PRODUCT_CREATED_ID,
        data,
        attachments: [ // optional var
            {
                //@ts-ignore
                content: base64,
                content_type: "image/png", // mime type
                //@ts-ignore
                filename: filename.ext,
                disposition: "attachment or inline attachment",
                id: "id", // only needed for inline attachment
            },
        ],
    })
}

export const config: SubscriberConfig = {
    event: "product.created",
}