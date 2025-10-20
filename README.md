# Test05 - Group05 - Playwright

<img src="https://playwright.dev/img/playwright-logo.svg" alt="Playwright" width="180"/>

## 1. Dự án
    Dự án này là bộ test tự động sử dụng **Playwright** để kiểm tra các tính năng của website. Nhóm **Group 05** thực hiện bài tập cho khóa học **Bootcamp FullStack Tester - Software Testing**. Các test case bao gồm: kiểm tra UI (Header, Footer, Home Page, Blog…), các chức năng tương tác của người dùng, dữ liệu hiển thị và logic của các thành phần web.

## 2. Cấu trúc thư mục

```
├─ tests/
│  ├─ common/
│  │  ├─ footer.spec.ts
│  │  └─ header.spec.ts
│  ├─ home/
│  │  ├─ banner.spec.ts
│  │  ├─ courseInfo.spec.ts
│  │  ├─ home.spec.ts
│  │  ├─ popularCourse.spec.ts
│  │  ├─ reactCourse.spec.ts
│  │  ├─ referenceCourse.spec.ts
│  │  ├─ statistic.spec.ts
│  │  ├─ studentReview.spec.ts
│  │  └─ topInstructors.spec.ts
│  └─ blog/
│     ├─ blog.spec.ts
│     ├─ blogList.spec.ts
│     ├─ suggestedPosts.spec.ts
│     └─ suggestedTopics.spec.ts
│
├─ pages/
│  ├─ common/
│  │  ├─ BackToTop.ts
│  │  ├─ Footer.ts
│  │  ├─ FooterConsultForm.ts
│  │  ├─ FooterCopyright.ts
│  │  ├─ FooterSocials.ts
│  │  └─ Header.ts
│  ├─ home/
│  │  ├─ Banner.ts
│  │  ├─ CourseInfo.ts
│  │  ├─ HomePage.ts
│  │  ├─ PopularCourse.ts
│  │  ├─ ReactCourse.ts
│  │  ├─ ReferenceCourse.ts
│  │  ├─ Statistic.ts
│  │  ├─ StudentReview.ts
│  │  └─ TopInstructors.ts
│  └─ blog/
│     ├─ BlogList.ts
│     ├─ BlogPage.ts
│     ├─ SuggestedPosts.ts
│     └─ SuggestedTopics.ts
│
├─ .env
├─ .gitignore
├─ package-lock.json
├─ package.json
├─ playwright.config.ts
├─ tsconfig.json
└─ README.md
```

## 3. Cài đặt & chạy test
    git clone https://github.com/NghiChris/Test05-Group05-PlayWright
    npm install
    npx playwright install

    Chạy tất cả test:
        npx playwright test
    
    Chạy test cụ thể:
        npx playwright test tests/home.spec.ts

    Xem báo cáo trực quan:
        npx playwright show-report


## 4. Thành viên nhóm & Test cases link
    1. Tất Xuyến Nghi
    2. Nguyễn Giang Sơn
    3. Trương Hồ Tường Hân
    4. Huỳnh Thị Bích Thuỳ - https://docs.google.com/spreadsheets/d/1jWHwxrnmrFu7QX-PTfSQqhYM7GVCBC1Xr17rYfA8YoQ/edit?usp=sharing


## 5. Tài liệu tham khảo
    - [Playwright Official Documentation](https://playwright.dev)
    - [Playwright Test Runner](https://playwright.dev/docs/test-intro)
    - [Page Object Model](https://playwright.dev/docs/pom)


