import { test, expect } from '@playwright/test';

test.describe('Exam Registration System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the exam form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Create New Exam' })).toBeVisible();
    await expect(page.getByLabel('Exam Title')).toBeVisible();
    await expect(page.getByLabel('Date and Time')).toBeVisible();
    await expect(page.getByLabel('Capacity')).toBeVisible();
  });

  test('should create a new exam', async ({ page }) => {
    await page.getByLabel('Exam Title').fill('Test Exam');
    await page.getByLabel('Date and Time').fill('2024-03-20T10:00');
    await page.getByLabel('Capacity').fill('30');
    await page.getByRole('button', { name: 'Create Exam' }).click();

    await expect(page.getByText('Test Exam')).toBeVisible();
  });

  test('should register a student', async ({ page }) => {
    await page.getByLabel('Full Name').fill('John Doe');
    await page.getByLabel('Email Address').fill('john@example.com');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.getByText('Logged in as: John Doe')).toBeVisible();
  });
});