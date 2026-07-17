CREATE TABLE `challenge_submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `submission_status_idx` ON `challenge_submissions` (`status`);--> statement-breakpoint
CREATE INDEX `submission_email_idx` ON `challenge_submissions` (`email`);--> statement-breakpoint
ALTER TABLE `collaborations` ADD `role` text;--> statement-breakpoint
ALTER TABLE `collaborations` ADD `company` text;--> statement-breakpoint
ALTER TABLE `collaborations` ADD `intent` text NOT NULL;--> statement-breakpoint
ALTER TABLE `collaborations` ADD `status` text DEFAULT 'new' NOT NULL;--> statement-breakpoint
ALTER TABLE `collaborations` ADD `updated_at` integer NOT NULL;--> statement-breakpoint
CREATE INDEX `collaboration_status_idx` ON `collaborations` (`status`);--> statement-breakpoint
CREATE INDEX `collaboration_email_idx` ON `collaborations` (`email`);