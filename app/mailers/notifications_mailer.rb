class NotificationsMailer < ActionMailer::Base
  default 'app_name' => 'Council'
  default from: 'hq@groupbuddies.com'

  def new_comment(subscription_id)
    @subscription = Subscription.find(subscription_id)

    mail to: @subscription.user.email, subject: "[Council] New comment in #{@subscription.discussion.title}"
  end
end
