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
    const notificationModuleService: INotificationModuleService =
        container.resolve(Modules.NOTIFICATION)

    await notificationModuleService.createNotifications({
        to: "info@consciousgenetics.com",
        channel: "email",
        template: process.env.SENDGRID_PRODUCT_CREATED_ID,
        data,
    })
}

export const config: SubscriberConfig = {
    event: "product.created",
}