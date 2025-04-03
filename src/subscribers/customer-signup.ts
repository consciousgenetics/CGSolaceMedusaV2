import { INotificationModuleService } from '@medusajs/framework/types'
import { Modules } from '@medusajs/framework/utils'
import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'

export default async function customerSignupHandler({
  event: { data },
  container,
}: SubscriberArgs<any>) {
  const notificationModuleService: INotificationModuleService = container.resolve(
    Modules.NOTIFICATION
  )

  try {
    await notificationModuleService.createNotifications({
      to: data.email,
      channel: 'email',
      template: process.env.SENDGRID_CUSTOMER_SIGNUP_ID,
      data: {
        id: data.id,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        emailOptions: {
          replyTo: process.env.SENDGRID_FROM_EMAIL || 'info@example.com',
          subject: "Welcome to our store!"
        },
        preview: 'Thank you for creating an account with us!',
        loginLink: `${process.env.FRONTEND_URL || 'https://example.com'}/account/login`
      }
    })
  } catch (error) {
    console.error('Error sending customer signup notification:', error)
  }
}

export const config: SubscriberConfig = {
  event: 'customer.created'
} 