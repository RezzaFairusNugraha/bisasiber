import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const difficultyEnum = pgEnum("difficulty", [
  "easy",
  "intermediate",
  "hard",
]);

export const roleEnum = pgEnum("user_role", ["student", "instructor", "admin"]);

export const labStatusEnum = pgEnum("lab_status", [
  "starting",
  "running",
  "stopped",
  "expired",
]);

/**
 * Tabel Users (Pengguna BisaSiber)
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  avatarUrl: text("avatar_url"),
  role: roleEnum("role").default("student").notNull(),
  points: integer("points").default(0).notNull(),
  streakDays: integer("streak_days").default(0).notNull(),
  rankTitle: text("rank_title").default("Script Kiddie").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Tabel Rooms (Modul Pembelajaran / Skenario Siber)
 */
export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // misal: "Penetration Tester", "Security Analyst", "AI Security"
  experienceLevel: text("experience_level").notNull(), // misal: "Mulai dari nol", "Sudah paham dasar", "Tingkat mahir"
  difficulty: difficultyEnum("difficulty").default("easy").notNull(),
  coverImageUrl: text("cover_image_url").notNull(),
  estimatedMinutes: integer("estimated_minutes").default(45).notNull(),
  pointsReward: integer("points_reward").default(100).notNull(),
  isNew: boolean("is_new").default(false).notNull(),
  isPremium: boolean("is_premium").default(false).notNull(),
  dockerImage: text("docker_image"),
  enrolledCount: integer("enrolled_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Tabel Tasks (Pertanyaan, Instruksi Lab, & Flag per Room)
 */
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  roomId: integer("room_id")
    .notNull()
    .references(() => rooms.id, { onDelete: "cascade" }),
  orderIndex: integer("order_index").notNull(),
  title: text("title").notNull(),
  contentMarkdown: text("content_markdown").notNull(),
  question: text("question").notNull(),
  flagHash: text("flag_hash").notNull(), // Contoh: BISA{s3l4m4t_b3l4j4r_s1b3r}
  hint: text("hint"),
  points: integer("points").default(25).notNull(),
  requiresLab: boolean("requires_lab").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Tabel User Progress (Progres Penyelesaian Task & Room oleh Pengguna)
 */
export const userProgress = pgTable(
  "user_progress",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    roomId: integer("room_id")
      .notNull()
      .references(() => rooms.id, { onDelete: "cascade" }),
    taskId: integer("task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    isCompleted: boolean("is_completed").default(false).notNull(),
    submittedFlag: text("submitted_flag"),
    completedAt: timestamp("completed_at"),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("user_task_unique_idx").on(table.userId, table.taskId),
  ]
);

/**
 * Tabel Lab Instances (Orkestrasi Container Lab Siber Interaktif)
 */
export const labInstances = pgTable("lab_instances", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  roomId: integer("room_id")
    .notNull()
    .references(() => rooms.id, { onDelete: "cascade" }),
  containerId: text("container_id").notNull().unique(),
  ipAddress: text("ip_address").notNull(),
  sshPort: integer("ssh_port").default(2222).notNull(),
  webPort: integer("web_port").default(8080).notNull(),
  status: labStatusEnum("status").default("starting").notNull(),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  terminatedAt: timestamp("terminated_at"),
});

/**
 * Relasi Antar Tabel (Drizzle Relations)
 */
export const usersRelations = relations(users, ({ many }) => ({
  progress: many(userProgress),
  labInstances: many(labInstances),
}));

export const roomsRelations = relations(rooms, ({ many }) => ({
  tasks: many(tasks),
  progress: many(userProgress),
  labInstances: many(labInstances),
}));

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  room: one(rooms, {
    fields: [tasks.roomId],
    references: [rooms.id],
  }),
  progress: many(userProgress),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, {
    fields: [userProgress.userId],
    references: [users.id],
  }),
  room: one(rooms, {
    fields: [userProgress.roomId],
    references: [rooms.id],
  }),
  task: one(tasks, {
    fields: [userProgress.taskId],
    references: [tasks.id],
  }),
}));

export const labInstancesRelations = relations(labInstances, ({ one }) => ({
  user: one(users, {
    fields: [labInstances.userId],
    references: [users.id],
  }),
  room: one(rooms, {
    fields: [labInstances.roomId],
    references: [rooms.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Room = typeof rooms.$inferSelect;
export type NewRoom = typeof rooms.$inferInsert;

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;

export type UserProgress = typeof userProgress.$inferSelect;
export type NewUserProgress = typeof userProgress.$inferInsert;

export type LabInstance = typeof labInstances.$inferSelect;
export type NewLabInstance = typeof labInstances.$inferInsert;
