import { EditEventModule } from './modules/edit-event/edit-event.module';
import { EventListModule } from './modules/event-list/event-list.module';
import { TipsModule } from './modules/tips/tips.module';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes, UrlSegment } from '@angular/router';
import { LoginModule } from './modules/login/login.module'
import { ForgotPasswordModule } from './modules/forgot-password/forgot-password.module'
import { PrivacyPolicyModule } from './modules/privacy-policy/privacy-policy.module'
import { ComplaintsPolicyModule } from './modules/complaints-policy/complaints-policy.module'
import { AcceptableUseModule } from './modules/acceptable-use/acceptable-use.module'
import { ContactModule } from './modules/contact/contact.module'
import { CookiesPolicyModule } from './modules/cookies-policy/cookies-policy.module'   
import { DisclaimerModule } from './modules/disclaimer/disclaimer.module'
import { DmcaModule } from './modules/dmca/dmca.module'
import { UscModule } from './modules/usc/usc.module'
import { AboutUsModule } from './modules/about-us/about-us.module'
import { SignUpModule } from './modules/sign-up/sign-up.module'
import { UserSelectionModule } from './modules/user-selection/user-selection.module'
import { VerifyIdModule } from './modules/verify-id/verify-id.module'
import { FaqModule } from './modules/faq/faq.module'
import { FeaturesModule } from './modules/features/features.module'
import { PollModule } from './modules/poll/poll.module'
import { PollAskModule } from './modules/poll-ask/poll-ask.module'
import { PollAskPostModule } from './modules/poll-ask-post/poll-ask-post.module'
import { HomeModule } from './modules/home/home.module'
import { NotificationModule } from './modules/notification/notification.module'
import { MessageModule } from './modules/message/message.module'
import { ReferralModule } from './modules/referral/referral.module'
import { TermsModule } from './modules/terms/terms.module'
import { ProfileModule } from './modules/profile/profile.module'
import { ProfilePhotoModule } from './modules/profile-photo/profile-photo.module'
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module'
import { NotificationSettingModule } from './modules/notification-setting/notification-setting.module'
import { GroupsModule } from './modules/groups/groups.module'
import { GroupsTwoModule } from './modules/groups-two/groups-two.module'
import { GroupsDetailModule } from './modules/groups-detail/groups-detail.module'
import { ProfileVaultModule } from './modules/profile-vault/profile-vault.module'
import { MoreModule } from './modules/more/more.module'
import { ProfileEditModule } from './modules/profile-edit/profile-edit.module'
import { ProfileEarningModule } from './modules/profile-earning/profile-earning.module'
import { ProfileDeleteModule } from './modules/profile-delete/profile-delete.module'
import { WithdrawEarningOneModule } from './modules/withdraw-earning-one/withdraw-earning-one.module'
import { WithdrawEarningTwoModule } from './modules/withdraw-earning-two/withdraw-earning-two.module'
import { WithdrawEarningThreeModule } from './modules/withdraw-earning-three/withdraw-earning-three.module'
import { ListModule } from './modules/list/list.module'
import { ListTwoModule } from './modules/list-two/list-two.module'
import { GroupNewModule } from './modules/group-new/group-new.module'
import { CreateGroupModule } from './modules/create-group/create-group.module'
import { GroupDetailNewModule } from './modules/group-detail-new/group-detail-new.module'
import { BookmarkModule } from './modules/bookmark/bookmark.module'
import { MessageFiveModule } from './modules/message-five/message-five.module'
import { MessageFourModule } from './modules/message-four/message-four.module'
import { MessageSixModule } from './modules/message-six/message-six.module'
import { MessageThreeModule } from './modules/message-three/message-three.module'
import { MessageTwoModule } from './modules/message-two/message-two.module'
import { GeoBlockingModule } from './modules/geo-blocking/geo-blocking.module'
import { GeoBlockingTwoModule } from './modules/geo-blocking-two/geo-blocking-two.module'
import { PageStateModule } from './modules/page-state/page-state.module'
import { ResetPasswordModule } from './modules/reset-password/reset-password.module'
import { DataNotFoundModule } from './modules/data-not-found/data-not-found.module'
import {StoryModule} from './modules/layout/story/story.module'
import {EventModule} from './modules/event/event.module'
import { CreateEventModule } from './modules/create-event/create-event.module'
import {PrivateEventFinalModule} from './modules/private-event-final/private-event-final.module'
import {JoinEventModule} from './modules/join-event/join-event.module'
import {EventPlayModule} from './modules/event-play/event-play.module'
import {PaymentConfirmationModule} from './modules/payment-confirmation/payment-confirmation.module'
import {PaymentModule} from './modules/payment/payment.module'
import {AddCardModule} from './modules/add-card/add-card.module'
import {CustomizeSubscriptionModule} from './modules/customize-subscription/customize-subscription.module'
import {VerifyIdTwoModule} from './modules/verify-id-two/verify-id-two.module'
import {SearchModule} from './modules/search/search.module'

const routes: Routes = [
	{
		path: '',
		loadChildren: () => LoginModule
	},
	{
		path: 'login',
		loadChildren: () => LoginModule
	},
	{
		path: 'forget-password',
		loadChildren: () => ForgotPasswordModule
	},
	{
		path: 'privacy-policy',
		loadChildren: () => PrivacyPolicyModule
	},
	{
		path: 'complaints-policy',
		loadChildren: () => ComplaintsPolicyModule
	},
	{
		path: 'acceptable-use',
		loadChildren: () => AcceptableUseModule
	},
	{
		path: 'cookies-policy',
		loadChildren: () => CookiesPolicyModule
	},
	{
		path: 'contact',
		loadChildren: () => ContactModule
	},
	{
		path: 'disclaimer',
		loadChildren: () => DisclaimerModule
	},
	{
		path: 'dmca',
		loadChildren: () => DmcaModule
	},
	{
		path: 'usc-2257',
		loadChildren: () => UscModule
	},
	{
		path: 'about-us',
		loadChildren: () => AboutUsModule
	},
	{
		path: 'signup',
		loadChildren: () => SignUpModule
	},
	{
		path: 'user-selection',
		loadChildren: () => UserSelectionModule
	},
	{
		path: 'verify-id',
		loadChildren: () => VerifyIdModule
	},
	{
		path: 'faq',
		loadChildren: () => FaqModule
	},
	{
		path: 'features',
		loadChildren: () => FeaturesModule
	},
	{
		path: 'poll',
		loadChildren: () => PollModule
	},
	{
		path: 'poll-ask',
		loadChildren: () => PollAskModule
	},
	{
		path: 'poll-post',
		loadChildren: () => PollAskPostModule
	},
	{
		path: 'home',
		loadChildren: () => HomeModule
	},
	{
		path: 'notification',
		loadChildren: () => NotificationModule
	},
	{
		path: 'message',
		loadChildren: () => MessageModule
	},
	{
		path: 'referral',
		loadChildren: () => ReferralModule
	},
	{
		path: 'terms',
		loadChildren: () => TermsModule
	},
	{
		path: 'profile',
		loadChildren: () => ProfileModule
	},
	// {
	// 	matcher: (url) => {
	// 		if (url.length === 1 && url[0].path.match(/^@[\w]+$/gm)) {
	// 			return {
	// 				consumed: url,
	// 				posParams: {
	// 					username: new UrlSegment(url[0].path.substr(1), {})
	// 				}
	// 			};
	// 		}

	// 		return null;
	// 	},
	// 	loadChildren: () => ProfileModule
	// },
	{
		path: 'profile-2',
		loadChildren: () => ProfilePhotoModule
	},
	{
		path: 'subscriptions',
		loadChildren: () => SubscriptionsModule
	},
	{
		path: 'notification-setting',
		loadChildren: () => NotificationSettingModule
	},
	{
		path: 'groups',
		loadChildren: () => GroupsModule
	},
	{
		path: 'groups-2',
		loadChildren: () => GroupsTwoModule
	},
	{
		path: 'groups-detail',
		loadChildren: () => GroupsDetailModule
	},
	{
		path: 'profile-vault',
		loadChildren: () => ProfileVaultModule
	},
	{
		path: 'more',
		loadChildren: () => MoreModule
	},
	{
		path: 'profile-edit',
		loadChildren: () => ProfileEditModule
	},
	{
		path: 'profile-earning',
		loadChildren: () => ProfileEarningModule
	},
	{
		path: 'profile-delete',
		loadChildren: () => ProfileDeleteModule
	},
	{
		path: 'withdraw-earning-1',
		loadChildren: () => WithdrawEarningOneModule
	},
	{
		path: 'withdraw-earning-2',
		loadChildren: () => WithdrawEarningTwoModule
	},
	{
		path: 'withdraw-earning-3',
		loadChildren: () => WithdrawEarningThreeModule
	},
	{
		path: 'list',
		loadChildren: () => ListModule
	},
	{
		path: 'list-2',
		loadChildren: () => ListTwoModule
	},
	{
		path: 'group-new',
		loadChildren: () => GroupNewModule
	},
	{
		path: 'create-group',
		loadChildren: () => CreateGroupModule
	},
	{
		path: 'edit-group',
		loadChildren: () => CreateGroupModule
	},
	{
		path: 'group-detail-new',
		loadChildren: () => GroupDetailNewModule
	},
	{
		path: 'bookmark',
		loadChildren: () => BookmarkModule
	},
	{
		path: 'message-2',
		loadChildren: () => MessageTwoModule
	},
	{
		path: 'message-3',
		loadChildren: () => MessageThreeModule
	},
	{
		path: 'message-4',
		loadChildren: () => MessageFourModule
	},
	{
		path: 'message-5',
		loadChildren: () => MessageFiveModule
	},
	{
		path: 'message-6',
		loadChildren: () => MessageSixModule
	},
	{
		path: 'geo-blocking',
		loadChildren: () => GeoBlockingModule
	},
	{
		path: 'geo-blocking-2',
		loadChildren: () => GeoBlockingTwoModule
	},
	{
		path: 'page-state',
		loadChildren: () => PageStateModule
	},
	{
		path: 'reset-password',
		loadChildren: () => ResetPasswordModule
	},
	{
		path: 'data-not-found',
		loadChildren: () => DataNotFoundModule
	},
	{
		path: 'story',
		loadChildren: () => StoryModule
	},
	{
		path: 'event',
		loadChildren: () => EventModule
	},
	{
		path: 'event-list',
		loadChildren: () => EventListModule
	},
	{
		path: 'create-event',
		loadChildren: () => CreateEventModule
	},
	{
		path: 'edit-event',
		loadChildren: () => EditEventModule
	},
	{	
		path: 'private-event-final',
		loadChildren: () => PrivateEventFinalModule
	},
	{
		path: 'event-list',
		loadChildren: () => EventListModule
	},
	{	
		path: 'join-event',
		loadChildren: () => JoinEventModule
	},
	{
		path: 'event-play',
		loadChildren: () => EventPlayModule
	},
	{
		path: 'payment-confirm',
		loadChildren: () => PaymentConfirmationModule
	},
	{
		path: 'payment',
		loadChildren: () => PaymentModule
	},
	{ // added by sagadev
		path: 'tips',
		loadChildren: () => TipsModule
	},
	{ 
		path: 'add-card',
		loadChildren: () => AddCardModule
	},
	// {
	// 	matcher: (url) => {
	// 		if (url.length === 1 && url[0].path.match(/^[\w]+$/gm)) {
	// 			return {
	// 				consumed: url,
	// 				posParams: {
	// 					username: new UrlSegment(url[0].path.substr(0), {})
	// 				}
	// 			};
	// 		}
	{
		path: 'add-card',
		loadChildren: () => AddCardModule
	},
	{
		path: 'customize-subscription',
		loadChildren: () => CustomizeSubscriptionModule
	},
	{
		path: 'verify-id-2',
		loadChildren: () => VerifyIdTwoModule
	},
	{
		path: 'search',
		loadChildren: () => SearchModule
	},
	{
		matcher: (url) => {
			if (url.length === 1 && url[0].path.match(/^[\w]+$/gm)) {
				return {
					consumed: url,
					posParams: {
						username: new UrlSegment(url[0].path.substr(0), {})
					}
				};
			}
			return null;
		},
		loadChildren: () => ProfileModule
	}
	


];

@NgModule({
	imports: [RouterModule.forRoot(routes, { 
		onSameUrlNavigation: 'reload', 
		scrollPositionRestoration: 'enabled',
		anchorScrolling: 'enabled' 
	})],
	exports: [RouterModule]
})
export class AppRoutingModule {
	constructor(private router: Router) {
		this.router.errorHandler = (error: any) => {
			this.router.navigate(['private']); // or redirect to default route
		}
	}
}
