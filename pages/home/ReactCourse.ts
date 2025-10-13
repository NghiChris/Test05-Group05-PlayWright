import { Page, Locator, expect } from "@playwright/test";

export default class ReactCourse {
  readonly page: Page;
  readonly sectionTitle: Locator;
  readonly courseCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sectionTitle = page.locator(".homePage .mt-5").nth(1).locator("h6 a", {
      hasText: "Khóa học Front End React Js",
    });
  }

  async verifyTitleVisible() {
    await expect(this.sectionTitle).toBeVisible({ timeout: 10000 });
  }

  async verifySectionReady() {
    await expect(this.sectionTitle).toBeVisible({ timeout: 10000 });
    const firstCardFooter = this.page
      .locator(".homePage .mt-5")
      .nth(1)
      .locator(".cardGlobalRes .cardFooter")
      .first();
    await expect(firstCardFooter).toBeVisible({ timeout: 10000 });
  }

  private async withSectionReady(fn: () => Promise<void>) {
    await this.verifySectionReady();
    await fn();
  }

  async verifyTitleLink() {
    return this.withSectionReady(async () => {
      const href = await this.sectionTitle.getAttribute("href");
      expect(href).not.toBeNull();
      expect(href).not.toBe("");
    });
  }

  async verifyCoursesDisplayed() {
    return this.withSectionReady(async () => {
      const courses = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes");
      await expect(courses.first()).toBeVisible({ timeout: 10000 });
      const count = await courses.count();
      expect(count).toBeGreaterThanOrEqual(3);
      expect(count).toBeLessThanOrEqual(10);
    });
  }

  async verifyCourseImages() {
    return this.withSectionReady(async () => {
      const courseImages = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobal > img");
      await expect(courseImages.first()).toBeVisible({ timeout: 10000 });
      const count = await courseImages.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const img = courseImages.nth(i);
        await expect(img).toBeVisible();
        const src = await img.getAttribute("src");
        expect(src).not.toBeNull();
        expect(src).not.toEqual("");

        // Check link ảnh
        const response = await this.page.request.get(src!);
        expect(response.status()).toBe(200);
      }
    });
  }

  async verifyCourseTitles() {
    return this.withSectionReady(async () => {
      const titles = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes .cardBodyGlobal h6");
      await expect(titles.first()).toBeVisible({ timeout: 10000 });

      const count = await titles.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const title = titles.nth(i);
        await expect(title).toBeVisible();

        const text = await title.textContent();
        expect(text?.trim().length).toBeGreaterThan(0);

        const fontSize = await title.evaluate(
          (el) => window.getComputedStyle(el).fontSize
        );
        expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(14);

        const color = await title.evaluate(
          (el) => window.getComputedStyle(el).color
        );
        expect(color).not.toBe("");
      }
    });
  }

  async verifyUniqueCourseTitles() {
    return this.withSectionReady(async () => {
      const titles = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes .cardBodyGlobal h6");
      await expect(titles.first()).toBeVisible({ timeout: 10000 });

      const count = await titles.count();
      expect(count).toBeGreaterThan(0);

      const listTitles = new Set<string>();

      for (let i = 0; i < count; i++) {
        const title = titles.nth(i);
        await expect(title).toBeVisible();

        const text = await title.textContent();
        expect(text?.trim().length).toBeGreaterThan(0);

        // Kiểm tra unique
        expect(listTitles.has(text)).toBe(false); // Nếu đã tồn tại → fail
        listTitles.add(text);
      }
    });
  }

  async verifyCourseCategories() {
    return this.withSectionReady(async () => {
      const categories = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes .stikerCard");

      const count = await categories.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const category = categories.nth(i);
        await expect(category).toBeVisible();

        const text = await category.textContent();
        expect(text?.trim().length).toBeGreaterThan(0);

        const fontSize = await category.evaluate(
          (el) => window.getComputedStyle(el).fontSize
        );
        expect(parseFloat(fontSize)).toBeGreaterThan(0);

        const color = await category.evaluate(
          (el) => window.getComputedStyle(el).color
        );
        expect(color).not.toBe("");

        const overflow = await category.evaluate(
          (el) => window.getComputedStyle(el).overflow
        );
        expect(overflow).toBe("hidden");

        const textOverflow = await category.evaluate(
          (el) => window.getComputedStyle(el).textOverflow
        );
        expect(textOverflow).toBe("ellipsis");
      }
    });
  }

  async verifyCourseHours() {
    return this.withSectionReady(async () => {
      const courseCards = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes");
      const count = await courseCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const card = courseCards.nth(i);

        const spans = card.locator(".cardIcon span");
        const spanCount = await spans.count();
        expect(spanCount).toBeGreaterThan(0);

        let found = false;
        for (let j = 0; j < spanCount; j++) {
          const span = spans.nth(j);
          const text = (await span.textContent())?.trim() || "";

          if (text.includes("giờ")) {
            found = true;
            const icon = span.locator("i.iconOclock");
            expect(await icon.count()).toBeGreaterThan(0);
            break;
          }
        }

        expect(found).toBe(true);
      }
    });
  }

  async verifyCourseTotalDuration() {
    return this.withSectionReady(async () => {
      const courseCards = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes");
      const count = await courseCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const card = courseCards.nth(i);
        const spans = card.locator(".cardIcon span");
        const spanCount = await spans.count();
        expect(spanCount).toBeGreaterThan(0);

        let found = false;
        for (let j = 0; j < spanCount; j++) {
          const span = spans.nth(j);
          const text = (await span.textContent())?.trim() || "";
          if (text.includes("tuần") || text.includes("tháng")) {
            found = true;
            const icon = span.locator("i.iconCalendar");
            expect(await icon.count()).toBeGreaterThan(0);
            break;
          }
        }
        expect(found).toBe(true);
      }
    });
  }

  async verifyCourseLevels() {
    return this.withSectionReady(async () => {
      const cards = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes");
      const cardCount = await cards.count();
      expect(cardCount).toBeGreaterThan(0);

      for (let i = 0; i < cardCount; i++) {
        const card = cards.nth(i);
        await expect(card).toBeVisible({ timeout: 10000 });

        const spanLocator = card.locator(".cardIcon span");
        await expect(spanLocator.first()).toBeVisible({ timeout: 10000 });

        const spanCount = await spanLocator.count();
        let foundLevel = false;
        for (let j = 0; j < spanCount; j++) {
          const span = spanLocator.nth(j);
          const icon = span.locator("i.iconLevel");
          if ((await icon.count()) > 0) {
            await expect(icon).toBeVisible();

            const text = (await span.textContent())?.trim() || "";
            expect(text.length).toBeGreaterThan(0);

            foundLevel = true;
            break;
          }
        }

        expect(foundLevel).toBe(true);
      }
    });
  }

  async verifyCourseTeachers() {
    return this.withSectionReady(async () => {
      const teacherBlocks = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes .titleMaker");

      const count = await teacherBlocks.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const teacherBlock = teacherBlocks.nth(i);

        // Avatar
        const avatar = teacherBlock.locator("img");
        await expect(avatar).toBeVisible();
        const avatarSrc = await avatar.getAttribute("src");
        expect(avatarSrc).not.toBeNull();
        expect(avatarSrc).not.toEqual("");

        // Tên giáo viên
        const teacherName = teacherBlock.locator(".colorCardTitle");
        await expect(teacherName).toBeVisible();

        const text = await teacherName.textContent();
        expect(text?.trim().length).toBeGreaterThan(0);

        // Font-size
        const fontSize = await teacherName.evaluate(
          (el) => window.getComputedStyle(el).fontSize
        );
        expect(parseFloat(fontSize)).toBeGreaterThan(0);

        // Color
        const color = await teacherName.evaluate(
          (el) => window.getComputedStyle(el).color
        );
        expect(color).not.toBe("");
      }
    });
  }

  async verifyCoursePrices() {
    return this.withSectionReady(async () => {
      const priceBlocks = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes .cardFooter div:nth-child(2)");

      const count = await priceBlocks.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const block = priceBlocks.nth(i);

        // Giá cũ (bắt buộc, gạch ngang, font nhỏ hơn)
        const oldPrice = block.locator("p").nth(0);
        await expect(oldPrice).toBeVisible();
        const oldText = (await oldPrice.textContent())?.trim() || "";
        expect(oldText.length).toBeGreaterThan(0);

        const oldStyle = await oldPrice.evaluate((el) => {
          const s = window.getComputedStyle(el);
          return {
            textDecoration: s.textDecorationLine,
            fontSize: parseFloat(s.fontSize),
            color: s.color,
          };
        });
        expect(oldStyle.textDecoration).toContain("line-through");
        expect(oldStyle.fontSize).toBeLessThan(16);
        expect(oldStyle.color).not.toBe("");

        // Giá mới
        const newPrice = block.locator("p").nth(1);
        await expect(newPrice).toBeVisible();
        const newText = (await newPrice.textContent())?.trim() || "";
        expect(newText.length).toBeGreaterThan(0);

        const newStyle = await newPrice.evaluate((el) => {
          const s = window.getComputedStyle(el);
          return {
            fontWeight: s.fontWeight,
            color: s.color,
          };
        });
        expect(Number(newStyle.fontWeight)).toBeGreaterThanOrEqual(500);
        expect(newStyle.color).not.toBe("");
      }
    });
  }

  async verifyCourseOldAndNewPrices() {
    return this.withSectionReady(async () => {
      const priceBlocks = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes .cardFooter div:nth-child(2)");
      const count = await priceBlocks.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const block = priceBlocks.nth(i);

        // Giá cũ
        const oldPrice = block.locator("p").nth(0);
        await expect(oldPrice).toBeVisible();
        const oldText = (await oldPrice.textContent())?.trim() || "";
        expect(oldText.length).toBeGreaterThan(0);

        const oldStyle = await oldPrice.evaluate((el) => {
          const s = window.getComputedStyle(el);
          return {
            textDecoration: s.textDecorationLine,
            fontSize: parseFloat(s.fontSize),
            color: s.color,
          };
        });
        expect(oldStyle.textDecoration).toContain("line-through");
        expect(oldStyle.fontSize).toBeLessThan(16);
        expect(oldStyle.color).not.toBe("");

        // Giá mới
        const newPrice = block.locator("p").nth(1);
        await expect(newPrice).toBeVisible();
        const newText = (await newPrice.textContent())?.trim() || "";
        expect(newText.length).toBeGreaterThan(0);

        const newStyle = await newPrice.evaluate((el) => {
          const s = window.getComputedStyle(el);
          return {
            fontWeight: s.fontWeight,
            color: s.color,
          };
        });
        expect(Number(newStyle.fontWeight)).toBeGreaterThanOrEqual(500);
        expect(newStyle.color).not.toBe("");
      }
    });
  }

  async verifyCourseHoverShowsSubCard() {
    return this.withSectionReady(async () => {
      const courseCards = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes .cardGlobal");
      const count = await courseCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const card = courseCards.nth(i);

        // Hover vào card
        await card.hover();

        // Kiểm tra subCard xuất hiện
        const subCard = card.locator(".subCard");
        await expect(subCard).toBeVisible({ timeout: 5000 });

        // Kiểm tra nội dung chính trong subCard
        const title = subCard.locator("h6");
        await expect(title).toBeVisible();
        const desc = subCard.locator("p.colorCardTitle");
        await expect(desc).toBeVisible();
        const button = subCard.locator("button.btnSubCard a");
        await expect(button).toBeVisible();

        // Rời chuột đi để test card khác
        await this.page.mouse.move(0, 0);
      }
    });
  }

  async verifySubCardCourseTitlesOnHover() {
    return this.withSectionReady(async () => {
      const courseCards = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes .cardGlobal");
      const count = await courseCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const card = courseCards.nth(i);

        // Hover vào card
        await card.hover();

        // SubCard
        const subCard = card.locator(".subCard");
        await expect(subCard).toBeVisible({ timeout: 5000 });

        // Tên khóa học trong subCard (h6)
        const courseName = subCard.locator("h6");
        await expect(courseName).toBeVisible();

        const text = (await courseName.textContent())?.trim() || "";
        expect(text.length).toBeGreaterThan(0);

        // Rời chuột để test card tiếp theo
        await this.page.mouse.move(0, 0);
      }
    });
  }

  async verifyMainAndSubCardCourseTitlesMatch() {
    return this.withSectionReady(async () => {
      const courseCards = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes .cardGlobal");
      const count = await courseCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const card = courseCards.nth(i);

        // Lấy tên trên card chính
        const mainTitle = await card
          .locator(".cardBodyGlobal h6")
          .textContent();
        const mainText = (mainTitle?.trim() || "")
          .replace("...", "")
          .toLowerCase();

        // Hover để subCard hiện ra
        await card.hover();

        const subCard = card.locator(".subCard");
        await expect(subCard).toBeVisible();

        const subTitle = await subCard.locator("h6").textContent();
        const subText = (subTitle?.trim() || "").toLowerCase();

        // Kiểm tra: subCard phải chứa đoạn text chính
        expect(subText).toContain(mainText);

        // Reset hover
        await this.page.mouse.move(0, 0);
      }
    });
  }

  async verifyMainSubCardTeachersMatch() {
    return this.withSectionReady(async () => {
      const courseCards = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes .cardGlobal");
      const count = await courseCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const card = courseCards.nth(i);

        // Avatar chính
        const mainAvatar = card.locator(".imgCardFooter img");
        const mainSrc = await mainAvatar.getAttribute("src");

        // Tên giáo viên chính
        const mainTeacher = card.locator(".titleMaker .colorCardTitle");
        const mainTeacherName = (await mainTeacher.textContent())?.trim() || "";

        // Hover mở subCard
        await card.hover();
        const subCard = card.locator(".subCard");
        await expect(subCard).toBeVisible();

        // Avatar trong subCard
        const subAvatar = subCard.locator(".subCardHead img");
        await expect(subAvatar).toBeVisible();
        const subSrc = await subAvatar.getAttribute("src");

        // Tên giáo viên trong subCard
        const subTeacher = subCard.locator(".subCardHead .colorCardTitle");
        await expect(subTeacher).toBeVisible();
        const subTeacherName = (await subTeacher.textContent())?.trim() || "";

        // So sánh avatar
        expect(subSrc).toBe(mainSrc);

        // So sánh tên giáo viên
        expect(subTeacherName).toBe(mainTeacherName);

        // Reset hover
        await this.page.mouse.move(0, 0);
      }
    });
  }

  async verifyMainSubCardStudyHoursMatch() {
    return this.withSectionReady(async () => {
      const courseCards = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes .cardGlobal");
      const count = await courseCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const card = courseCards.nth(i);

        // Lấy giờ học từ main card
        const mainHour = card.locator(".cardBodyGlobal .cardIcon span").first();
        const mainHourText = (await mainHour.textContent())?.trim() || "";

        // Hover để mở subCard
        await card.hover();
        const subCard = card.locator(".subCard");
        await expect(subCard).toBeVisible();

        // Lấy giờ học từ subCard
        const subHour = subCard.locator(".cardIcon span").first();
        const subHourText = (await subHour.textContent())?.trim() || "";

        // Kiểm tra icon (phải có class clock)
        await expect(subHour.locator("i.iconOclock")).toBeVisible();

        // So sánh text (ví dụ: "8 giờ")
        expect(subHourText).toBe(mainHourText);

        // Reset hover
        await this.page.mouse.move(0, 0);
      }
    });
  }

  async verifyMainSubCardTotalTimeMatch() {
    return this.withSectionReady(async () => {
      const courseCards = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes .cardGlobal");
      const count = await courseCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const card = courseCards.nth(i);

        // Lấy tổng thời gian từ main card (icon calendar)
        const mainDuration = card
          .locator(".cardBodyGlobal .cardIcon span")
          .nth(1);
        const mainDurationText =
          (await mainDuration.textContent())?.trim() || "";

        // Hover để mở subCard
        await card.hover();
        const subCard = card.locator(".subCard");
        await expect(subCard).toBeVisible();

        // Lấy tổng thời gian từ subCard
        const subDuration = subCard.locator(".cardIcon span").nth(1);
        const subDurationText = (await subDuration.textContent())?.trim() || "";

        // Kiểm tra icon calendar
        await expect(subDuration.locator("i.iconCalendar")).toBeVisible();

        // So sánh text
        expect(subDurationText).toBe(mainDurationText);

        // Reset hover
        await this.page.mouse.move(0, 0);
      }
    });
  }

  async verifyMainSubCardLevelMatch() {
    return this.withSectionReady(async () => {
      const courseCards = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes .cardGlobal");
      const count = await courseCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const card = courseCards.nth(i);

        // Lấy level từ main card (icon signal)
        const mainLevel = card.locator(".cardBodyGlobal .cardIcon span").nth(2);
        const mainLevelText = (await mainLevel.textContent())?.trim() || "";

        // Hover để mở subCard
        await card.hover();
        const subCard = card.locator(".subCard");
        await expect(subCard).toBeVisible();

        // Lấy level từ subCard
        const subLevel = subCard.locator(".cardIcon span").nth(2);
        const subLevelText = (await subLevel.textContent())?.trim() || "";

        // Kiểm tra icon level
        await expect(subLevel.locator("i.iconLevel")).toBeVisible();

        // So sánh text (ví dụ: "Tất cả", "Beginner", "Advanced")
        expect(subLevelText).toBe(mainLevelText);

        // Reset hover
        await this.page.mouse.move(0, 0);
      }
    });
  }

  async verifySubCardViewDetailButton() {
    return this.withSectionReady(async () => {
      const courseCards = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes .cardGlobal");
      const count = await courseCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const card = courseCards.nth(i);

        // Hover để mở subCard
        await card.hover();
        const subCard = card.locator(".subCard");
        await expect(subCard).toBeVisible();

        // Nút "Xem chi tiết"
        const button = subCard.locator("button.btnSubCard a");
        await expect(button).toBeVisible();

        const text = (await button.textContent())?.trim() || "";
        expect(text).toBe("Xem chi tiết");

        // Kiểm tra style cơ bản
        const fontSize = await button.evaluate(
          (el) => window.getComputedStyle(el).fontSize
        );
        const color = await button.evaluate(
          (el) => window.getComputedStyle(el).color
        );

        expect(parseFloat(fontSize)).toBeGreaterThan(10);
        expect(color).not.toBe("");

        // Reset hover
        await this.page.mouse.move(0, 0);
      }
    });
  }

  async verifySubCardViewDetailButtonNavigation() {
    return this.withSectionReady(async () => {
      const courseCards = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes .cardGlobal");
      const count = await courseCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const card = courseCards.nth(i);

        // Hover để mở subCard
        await card.hover();
        const subCard = card.locator(".subCard");
        await expect(subCard).toBeVisible();

        // Nút "Xem chi tiết"
        const buttonLink = subCard.locator("button.btnSubCard a");
        await expect(buttonLink).toBeVisible();

        // Check đúng format
        const href = await buttonLink.getAttribute("href");
        expect(href).not.toBeNull();
        expect(href).toMatch(/^\/chitiet\/[^/]+$/);

        // Kiểm tra target để biết mở tab mới hay trong cùng tab
        const target = await buttonLink.getAttribute("target");

        if (target === "_blank") {
          // Bắt sự kiện tab mới
          const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            buttonLink.click(),
          ]);

          // Đợi navigation
          await newPage.waitForURL(/\/chitiet\/[^/]+$/, {
            timeout: 15000,
            waitUntil: "commit",
          });
          expect(newPage.url()).toMatch(/\/chitiet\/[^/]+$/);

          // Đóng tab chi tiết
          await newPage.close();

          // Trở lại trang chính
          await this.page.goto("/", { waitUntil: "domcontentloaded" });
          await this.verifySectionReady();
        } else {
          // Mở trong cùng tab
          await Promise.all([
            this.page.waitForURL(/\/chitiet\/[^/]+$/, {
              timeout: 15000,
              waitUntil: "commit",
            }),
            buttonLink.click(),
          ]);
          expect(this.page.url()).toMatch(/\/chitiet\/[^/]+$/);

          // Quay lại trang chủ để tiếp tục test
          await this.page.goto("/", { waitUntil: "domcontentloaded" });
          await this.verifySectionReady();
        }

        // Reset hover
        await this.page.mouse.move(0, 0);
      }
    });
  }

  async verifyCourseTitleLinkNavigation() {
    return this.withSectionReady(async () => {
      const courseCards = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes");
      const count = await courseCards.count();
      expect(count).toBeGreaterThan(0);

      const courseTitles: string[] = [];

      for (let i = 0; i < count; i++) {
        const card = courseCards.nth(i);
        const link = card.locator(".card-body a.card-title");
        await expect(link).toBeVisible();

        const href = await link.getAttribute("href");
        expect(href).toBeTruthy();
        expect(href).toMatch(/^\/chitiet\/[^/]+$/);

        // Lưu title để check trùng
        const titleText = (await link.textContent())?.trim() || "";
        courseTitles.push(titleText);

        // Click và chờ DOM sẵn sàng
        await Promise.all([
          this.page.waitForLoadState("domcontentloaded"),
          link.click(),
        ]);

        // Không phải 404
        const error404 = this.page.locator(".content404");
        await expect(error404).toHaveCount(0);

        // Quay lại trang chủ
        await this.page.goto("/", { waitUntil: "domcontentloaded" });
        await this.verifySectionReady();
      }

      // Check không bị trùng title
      const uniqueTitles = new Set(courseTitles);
      expect(uniqueTitles.size).toBe(courseTitles.length);
    });
  }

  async verifyCourseLinks() {
    return this.withSectionReady(async () => {
      const courseCards = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes a.cardGlobal");
      const count = await courseCards.count();
      expect(count).toBeGreaterThan(0);

      const courseTitles: string[] = [];

      for (let i = 0; i < count; i++) {
        const link = courseCards.nth(i);
        await expect(link).toBeVisible();

        const href = await link.getAttribute("href");
        expect(href).toBeTruthy();

        // Check đúng format
        expect(href).toMatch(/^\/chitiet/);

        // Lấy title trong card
        const titleText =
          (await link.locator(".cardBodyGlobal h6").textContent())?.trim() ||
          "";
        courseTitles.push(titleText);

        await Promise.all([
          this.page.waitForLoadState("domcontentloaded"),
          link.click(),
        ]);

        // Không phải 404
        const error404 = this.page.locator(".content404");
        await expect(error404).toHaveCount(0);

        // Quay lại home
        await this.page.goto("/", { waitUntil: "domcontentloaded" });
        await this.verifySectionReady();
      }

      // Check không bị trùng title
      const uniqueTitles = new Set(courseTitles);
      expect(uniqueTitles.size).toBe(courseTitles.length);
    });
  }

  async verifyCourseDetailContent() {
    return this.withSectionReady(async () => {
      const courseCards = this.page
        .locator(".homePage .mt-5")
        .nth(1)
        .locator(".cardGlobalRes a.cardGlobal");
      const count = await courseCards.count();
      expect(count).toBeGreaterThan(0);

      const courseContents: string[] = [];

      for (let i = 0; i < count; i++) {
        const link = courseCards.nth(i);
        await expect(link).toBeVisible();

        const href = await link.getAttribute("href");
        expect(href).toBeTruthy();

        // Check đúng format
        expect(href).toMatch(/^\/chitiet/);

        await Promise.all([
          this.page.waitForLoadState("domcontentloaded"),
          link.click(),
        ]);

        // Không phải 404
        const error404 = this.page.locator(".content404");
        await expect(error404).toHaveCount(0);

        // Lấy content trong trang chi tiết
        const detailContent =
          (
            await this.page.locator(".detailCouresContent").innerText()
          )?.trim() || "";
        courseContents.push(detailContent);

        // Quay lại home
        await this.page.goto("/", { waitUntil: "domcontentloaded" });
        await this.verifySectionReady();
      }

      // Check không bị trùng content
      const uniqueContents = new Set(courseContents);
      expect(uniqueContents.size).toBe(courseContents.length);
    });
  }
}
