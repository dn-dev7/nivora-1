CREATE TABLE `activities` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`kind` text NOT NULL,
	`subject` text NOT NULL,
	`topic` text NOT NULL,
	`seconds` integer DEFAULT 0 NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	`correct` integer DEFAULT 0 NOT NULL,
	`xp` integer DEFAULT 0 NOT NULL,
	`data` text NOT NULL,
	`visibility` text DEFAULT 'private' NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_activities_owner_created` ON `activities` (`owner`,`created`);--> statement-breakpoint
CREATE TABLE `cards` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`subject` text NOT NULL,
	`front` text NOT NULL,
	`back` text NOT NULL,
	`due` integer NOT NULL,
	`interval` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_cards_owner_due` ON `cards` (`owner`,`due`);--> statement-breakpoint
CREATE TABLE `comments` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`activity` text NOT NULL,
	`body` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_comments_activity` ON `comments` (`activity`);--> statement-breakpoint
CREATE TABLE `exams` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`name` text NOT NULL,
	`subject` text NOT NULL,
	`date` text NOT NULL,
	`topics` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_exams_owner` ON `exams` (`owner`);--> statement-breakpoint
CREATE TABLE `follows` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`target` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_follows_owner` ON `follows` (`owner`);--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`nickname` text NOT NULL,
	`handle` text NOT NULL,
	`subjects` text NOT NULL,
	`goal` integer DEFAULT 5 NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_handle_unique` ON `profiles` (`handle`);--> statement-breakpoint
CREATE TABLE `reactions` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`activity` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_reactions_activity` ON `reactions` (`activity`);--> statement-breakpoint
CREATE TABLE `runs` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`kind` text NOT NULL,
	`ids` text NOT NULL,
	`started` integer NOT NULL,
	`duration` integer NOT NULL,
	`finished` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_runs_owner` ON `runs` (`owner`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`subject` text NOT NULL,
	`topic` text NOT NULL,
	`goal` text NOT NULL,
	`duration` integer NOT NULL,
	`started` integer NOT NULL,
	`accumulated` integer DEFAULT 0 NOT NULL,
	`running` integer DEFAULT 1 NOT NULL,
	`finished` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_sessions_owner` ON `sessions` (`owner`);