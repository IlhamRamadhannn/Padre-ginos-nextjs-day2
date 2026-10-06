import { describe, expect, test } from "vitest";
import {
  canTransition,
  isOrderStatus,
  nextStatuses,
} from "@/lib/orders";

describe("nextStatuses", () => {
  test("pending can move to preparing or cancelled", () => {
    expect(nextStatuses("pending")).toEqual(["preparing", "cancelled"]);
  });

  test("ready can only move to delivered", () => {
    expect(nextStatuses("ready")).toEqual(["delivered"]);
  });

  test("final statuses cannot move anywhere", () => {
    expect(nextStatuses("delivered")).toEqual([]);
    expect(nextStatuses("cancelled")).toEqual([]);
  });
});

describe("canTransition", () => {
  test("allows valid transitions", () => {
    expect(canTransition("pending", "preparing")).toBe(true);
    expect(canTransition("pending", "cancelled")).toBe(true);
    expect(canTransition("preparing", "ready")).toBe(true);
    expect(canTransition("ready", "delivered")).toBe(true);
  });

  test("rejects invalid transitions", () => {
    expect(canTransition("ready", "pending")).toBe(false);
    expect(canTransition("delivered", "pending")).toBe(false);
    expect(canTransition("ready", "cancelled")).toBe(false);
  });
});

describe("isOrderStatus", () => {
  test("accepts valid statuses", () => {
    expect(isOrderStatus("pending")).toBe(true);
    expect(isOrderStatus("preparing")).toBe(true);
    expect(isOrderStatus("ready")).toBe(true);
    expect(isOrderStatus("delivered")).toBe(true);
    expect(isOrderStatus("cancelled")).toBe(true);
  });

  test("rejects invalid values", () => {
    expect(isOrderStatus("shipped")).toBe(false);
    expect(isOrderStatus("abc")).toBe(false);
    expect(isOrderStatus(123)).toBe(false);
    expect(isOrderStatus(null)).toBe(false);
  });
});