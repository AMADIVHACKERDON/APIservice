ALTER TABLE `reactions` ADD `visitor_id` text NOT NULL;--> statement-breakpoint
CREATE INDEX `reaction_visitor_idx` ON `reactions` (`visitor_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `reaction_unique_idx` ON `reactions` (`challenge_id`,`visitor_id`,`type`);