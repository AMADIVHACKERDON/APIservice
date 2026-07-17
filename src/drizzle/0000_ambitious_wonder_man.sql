CREATE TABLE `challenges` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`summary` text NOT NULL,
	`content` text NOT NULL,
	`category` text NOT NULL,
	`subcategory_id` text,
	`difficulty` text NOT NULL,
	`estimated_impact` text NOT NULL,
	`status` text DEFAULT 'open' NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`tags` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `challenges_slug_unique` ON `challenges` (`slug`);--> statement-breakpoint
CREATE INDEX `challenge_slug_idx` ON `challenges` (`slug`);--> statement-breakpoint
CREATE INDEX `challenge_category_idx` ON `challenges` (`category`);--> statement-breakpoint
CREATE INDEX `challenge_status_idx` ON `challenges` (`status`);--> statement-breakpoint
CREATE INDEX `challenge_subcategory_idx` ON `challenges` (`subcategory_id`);--> statement-breakpoint
CREATE TABLE `comments` (
	`id` text PRIMARY KEY NOT NULL,
	`challenge_id` text NOT NULL,
	`name` text,
	`email` text,
	`content` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`challenge_id`) REFERENCES `challenges`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `comment_challenge_idx` ON `comments` (`challenge_id`);--> statement-breakpoint
CREATE TABLE `contacts` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`subject` text NOT NULL,
	`message` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `collaborations` (
	`id` text PRIMARY KEY NOT NULL,
	`challenge_id` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`message` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`challenge_id`) REFERENCES `challenges`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `collaboration_challenge_idx` ON `collaborations` (`challenge_id`);--> statement-breakpoint
CREATE TABLE `reactions` (
	`id` text PRIMARY KEY NOT NULL,
	`challenge_id` text NOT NULL,
	`type` text DEFAULT 'like' NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`challenge_id`) REFERENCES `challenges`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `reaction_challenge_idx` ON `reactions` (`challenge_id`);--> statement-breakpoint
CREATE TABLE `subcategories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`description` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `subcategory_category_idx` ON `subcategories` (`category`);--> statement-breakpoint
CREATE INDEX `subcategory_name_idx` ON `subcategories` (`name`);