import { test, expect } from "@playwright/test";
import Header from "@pages/common/Header";

test.describe("Header - V Learning", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", {
      waitUntil: "domcontentloaded",
      timeout: 90000,
    });
  });

  test("TC-003 Kiểm tra hiển thị Logo", async ({ page }) => {
    const header = new Header(page);
    await expect(header.logo).toBeVisible({ timeout: 10000 });
  });

  test("TC-004 Kiểm tra liên kết Logo", async ({ page }) => {
    const header = new Header(page);
    await header.verifyHasLink(header.logo, "/");
  });

  test("TC-005 Kiểm tra hiển thị menu điều hướng", async ({ page }) => {
    const header = new Header(page);
    const menus = await header.getMenus();
    expect(menus.length).toBeGreaterThan(0);
  });

  test("TC-006 Kiểm tra chức năng menu điều hướng", async ({ page }) => {
    const header = new Header(page);
    await header.clickMenu("Danh mục");
    await expect(page).toHaveURL(/.*trangchu/);
  });

  test("TC-007 Kiểm tra hiển thị ô tìm kiếm", async ({ page }) => {
    const header = new Header(page);
    await header.verifyVisible(header.searchBox);
  });

  test("TC-008 Kiểm tra chức năng tìm kiếm", async ({ page }) => {
    const header = new Header(page);
    await header.searchCourse("JavaScript");
    await expect(page).toHaveURL(/\/timkiem\/JavaScript/);
  });

  test("TC-009 Kiểm tra hiển thị nút Đăng nhập", async ({ page }) => {
    const header = new Header(page);
    await header.verifyVisible(header.loginButton);
  });

  test("TC-010 Kiểm tra chức năng của ô [Tìm kiếm] (Enter + Click icon)", async ({
    page,
  }) => {
    const header = new Header(page);

    // 1. Tìm kiếm bằng Enter (Pass)
    await header.searchCourse("Javascript");

    const courseCards = page.locator(".courseSearchResult .myCourseItem");
    await page.waitForSelector(".courseSearchResult .myCourseItem", {
      timeout: 60000,
    });
    expect(await courseCards.count()).toBeGreaterThan(0);

    // 2. Tìm kiếm bằng icon click (Fail)
    const searchIcon = page.locator(".searchForm + button");
    await expect(searchIcon).toBeVisible({ timeout: 5000 });
    await expect(page).toHaveURL(/timkiem\/Javascript/, { timeout: 5000 });
  });

  test("TC-011 Kiểm tra giao diện (UI) của Logo", async ({ page }) => {
    const header = new Header(page);
    await expect(header.logo).toBeVisible({ timeout: 10000 });

    const box = await header.logo.boundingBox();
    expect(box).not.toBeNull();

    expect(box!.width).toBeGreaterThan(0);
    expect(box!.height).toBeGreaterThan(0);
  });

  test("TC-012 Kiểm tra chức năng điều hướng của Logo", async ({ page }) => {
    const header = new Header(page);
    await header.logo.click();
    await expect(page).toHaveURL("/");
  });

  test("TC-013 Kiểm tra giao diện UI của các menu", async ({ page }) => {
    const header = new Header(page);
    const menuItems = await header.menus.elementHandles();

    for (const menu of menuItems) {
      const box = await menu.boundingBox();

      const color = await menu.evaluate(
        (el) => getComputedStyle(el as Element).color
      );
      const fontSize = await menu.evaluate(
        (el) => getComputedStyle(el as Element).fontSize
      );
      const fontFamily = await menu.evaluate(
        (el) => getComputedStyle(el as Element).fontFamily
      );

      expect(color).toBe("rgb(37, 37, 37)");
      expect(fontSize).toBe("16px");
      expect(fontFamily).toContain("Roboto");
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThan(0);
      expect(box!.height).toBeGreaterThan(0);
    }
  });
  test("TC-014 Kiểm tra liên kết của các menu trên thanh điều hướng", async ({
    page,
  }) => {
    const header = new Header(page);

    type MenuLink = {
      name: string;
      href?: string;
      subMenus?: { name: string; href: string }[];
    };
    const menuLinks: MenuLink[] = [
      {
        name: "Danh mục",
        subMenus: [
          { name: "Lập trình Backend", href: "/danhmuckhoahoc/BackEnd" },
          { name: "Thiết kế Web", href: "/danhmuckhoahoc/Design" },
          { name: "Lập trình di động", href: "/danhmuckhoahoc/DiDong" },
          { name: "Lập trình Front end", href: "/danhmuckhoahoc/FrontEnd" },
          { name: "Lập trình Full Stack", href: "/danhmuckhoahoc/FullStack" },
          { name: "Tư duy lập trình", href: "/danhmuckhoahoc/TuDuy" },
        ],
      },
      { name: "Khóa học", href: "/khoahoc" },
      { name: "Blog", href: "/blog" },
      {
        name: "Sự kiện",
        href: "/sukien",
        subMenus: [
          { name: "Sự kiện Sale Cuối Năm", href: "/sukien/lastYear" },
          { name: "Sự kiện Giáng sinh", href: "/sukien/Noel" },
          { name: "Sự kiện Noel", href: "/sukien/Noel" },
        ],
      },
      { name: "Thông tin", href: "/thongtin" },
    ];
    for (const menu of menuLinks) {
      const menuLocator = page.locator(
        `ul.menuHeader > li:has-text("${menu.name}") > a`
      );

      if (menu.subMenus && menu.subMenus.length > 0) {
        await menuLocator.hover();
        for (const sub of menu.subMenus) {
          const subLocator = page.locator(
            `ul.menuHeader li:has-text("${menu.name}") ul.courseCateList li a:has-text("${sub.name}")`
          );
          await expect(subLocator).toHaveAttribute("href", sub.href);
        }
      } else if (menu.href) {
        await expect(menuLocator).toHaveAttribute("href", menu.href);
      }
    }
  });

  test("TC-015 Kiểm tra giao diện (UI) của nút [Đăng nhập]", async ({
    page,
  }) => {
    const header = new Header(page);
    await header.verifyVisible(header.loginButton);

    const loginColor = await header.loginButton.evaluate(
      (el) => window.getComputedStyle(el).color
    );
    expect(loginColor).toBe("rgb(255, 255, 255)");

    const loginBox = await header.loginButton.boundingBox();

    if (loginBox) {
      expect(loginBox.x).toBeGreaterThan(0);
    }
  });
});
