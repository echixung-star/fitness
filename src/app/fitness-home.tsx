"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useState } from "react";

type IconProps = {
  children: ReactNode;
  className?: string;
};

type SessionDay = "mon" | "wed" | "fri" | "sat";

const navItems = [
  ["训练体系", "#training"],
  ["器械配置", "#equipment"],
  ["教练团队", "#coaches"],
  ["课程时间", "#schedule"],
  ["会员方案", "#pricing"],
  ["用户评价", "#reviews"],
  ["预约体验", "#contact"],
] as const;

const heroSlides = [
  {
    image: "/assets/carousel-strength.png",
    label: "切换到力量区环境图",
  },
  {
    image: "/assets/carousel-cardio.png",
    label: "切换到有氧区环境图",
  },
  {
    image: "/assets/carousel-functional.png",
    label: "切换到功能训练区环境图",
  },
] as const;

const stats = [
  ["1200㎡", "自由训练和专项训练空间"],
  ["18+", "深蹲架与综合力量站"],
  ["06:30", "早训开放，适合上班族"],
  ["1:6", "小班课程人数控制"],
] as const;

const programs = [
  {
    title: "力量基础",
    description: "深蹲、卧推、硬拉、推举的动作建立与渐进加重，适合新手和重返训练的人。",
    icon: (
      <>
        <path d="M6 7v10" />
        <path d="M18 7v10" />
        <path d="M3 9v6" />
        <path d="M21 9v6" />
        <path d="M6 12h12" />
      </>
    ),
  },
  {
    title: "增肌塑形",
    description: "按肌群和训练容量安排计划，兼顾线条、围度、饮食建议和训练记录复盘。",
    icon: (
      <>
        <path d="M4 20V7" />
        <path d="M20 20V7" />
        <path d="M8 20V4" />
        <path d="M16 20V4" />
        <path d="M4 12h16" />
      </>
    ),
  },
  {
    title: "体能燃脂",
    description: "壶铃、雪橇、划船机和间歇训练组合，提高心肺和运动表现，训练强度可调。",
    icon: <path d="M13 2 4 14h8l-1 8 9-12h-8l1-8Z" />,
  },
  {
    title: "恢复与灵活性",
    description: "肩髋活动度、核心稳定、训练后放松，帮助你练得更久，也更少卡关。",
    icon: (
      <>
        <path d="M8 3h8" />
        <path d="M9 3v5l-4 9a3 3 0 0 0 3 4h8a3 3 0 0 0 3-4l-4-9V3" />
        <path d="M8 14h8" />
      </>
    ),
  },
] as const;

const equipment = [
  {
    title: "自由重量区",
    description: "杠铃、哑铃、可调卧推凳和多组深蹲架。",
    icon: (
      <>
        <path d="M6 5v14" />
        <path d="M18 5v14" />
        <path d="M3 8v8" />
        <path d="M21 8v8" />
        <path d="M6 12h12" />
      </>
    ),
  },
  {
    title: "硬拉平台",
    description: "减震地台、比赛片、拉力带和镁粉区。",
    icon: (
      <>
        <path d="M4 18h16" />
        <path d="M6 18 9 6h6l3 12" />
        <path d="M8 12h8" />
      </>
    ),
  },
  {
    title: "有氧体能",
    description: "风阻车、划船机、雪橇道和战绳。",
    icon: (
      <>
        <path d="M6 17c0-5 3-8 6-8s6 3 6 8" />
        <path d="M5 17h14" />
        <path d="M12 9V4" />
        <path d="M9 4h6" />
      </>
    ),
  },
  {
    title: "拉伸恢复",
    description: "筋膜枪、泡沫轴、拉伸垫和恢复角。",
    icon: (
      <>
        <path d="M4 7h16" />
        <path d="M7 7v13" />
        <path d="M17 7v13" />
        <path d="M9 11h6" />
        <path d="M9 15h6" />
      </>
    ),
  },
] as const;

const coaches = [
  {
    name: "周然",
    role: "力量举与动作评估",
    description: "擅长三大项技术调整，帮助会员建立稳定起杠路径和可持续加重节奏。",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=82",
    label: "力量教练照片",
  },
  {
    name: "林岚",
    role: "增肌塑形与饮食规划",
    description: "用训练容量和饮食记录做周期管理，适合目标明确但容易瓶颈的人。",
    image: "https://images.unsplash.com/photo-1609899464726-209befaac5bc?auto=format&fit=crop&w=900&q=82",
    label: "增肌教练照片",
  },
  {
    name: "韩拓",
    role: "体能训练与恢复",
    description: "结合壶铃、雪橇和灵活性训练，让力量训练之外的身体能力也跟上。",
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=900&q=82",
    label: "体能教练照片",
  },
] as const;

const dayTabs: { key: SessionDay; label: string }[] = [
  { key: "mon", label: "周一" },
  { key: "wed", label: "周三" },
  { key: "fri", label: "周五" },
  { key: "sat", label: "周六" },
];

const sessions: Record<SessionDay, readonly (readonly [string, string, string, string])[]> = {
  mon: [
    ["07:15", "力量基础 A", "深蹲技术 + 下肢辅助", "余 3 位"],
    ["18:30", "增肌上肢", "卧推、划船、肩部稳定", "余 2 位"],
    ["20:00", "新手入门", "器械熟悉 + 动作评估", "可预约"],
  ],
  wed: [
    ["07:15", "硬拉专项", "起杠位置、髋主导、背部张力", "余 1 位"],
    ["19:00", "体能燃脂", "划船机、壶铃、雪橇间歇", "余 4 位"],
    ["20:30", "恢复拉伸", "肩髋活动度 + 核心稳定", "可预约"],
  ],
  fri: [
    ["12:20", "午间快练", "45 分钟全身力量循环", "余 5 位"],
    ["18:30", "力量基础 B", "硬拉技术 + 后链训练", "余 2 位"],
    ["20:00", "增肌下肢", "深蹲、腿举、臀腿辅助", "可预约"],
  ],
  sat: [
    ["10:00", "周末铁馆课", "三大项技术复盘", "余 2 位"],
    ["14:00", "女生力量", "臀腿、上肢线条、体态改善", "余 3 位"],
    ["16:30", "私教评估", "动作筛查 + 训练建议", "可预约"],
  ],
};

const pricing = [
  {
    label: "入门体验",
    name: "月卡",
    price: "¥399",
    unit: "/ 月",
    features: ["不限次数自由训练", "基础动作评估一次", "训练记录模板"],
    action: "预约体验",
    featured: false,
  },
  {
    label: "推荐选择",
    name: "季卡",
    price: "¥999",
    unit: "/ 季",
    features: ["不限次数自由训练", "每月一次计划复盘", "小班课九折"],
    action: "锁定名额",
    featured: true,
  },
  {
    label: "认真进阶",
    name: "私教包",
    price: "¥2600",
    unit: "/ 10节",
    features: ["一对一技术指导", "周期训练计划", "饮食与恢复建议"],
    action: "咨询教练",
    featured: false,
  },
] as const;

const reviews = [
  ["以前深蹲一直膝盖不舒服，周教练先看了动作，再一点点改站距和髋部发力。练了一个月重量没掉，稳定性明显好很多。", "陈先生", "季卡会员 · 力量基础"],
  ["早上 7 点多来人不挤，深蹲架和硬拉平台基本都能排上。场馆不是花架子，器械维护得挺干净，训练记录也有人帮忙看。", "刘女士", "月卡会员 · 早训时段"],
  ["私教课不会一直催办卡，先做评估再给计划。我的肩颈紧和卧推卡点一起处理，训练完第二天也会提醒恢复和饮食。", "赵同学", "私教包 · 增肌塑形"],
  ["小班课人数控制得住，教练能看到每个人的动作。体能课强度够，但会按状态调整，不是单纯把人练趴下。", "王先生", "小班学员 · 体能燃脂"],
  ["最喜欢这里的氛围，大家都在认真练，不会尴尬。新手区分得清楚，第一次来有人带着熟悉器械，安全感很足。", "许女士", "体验转季卡 · 新手入门"],
] as const;

function Icon({ children, className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.2"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function ButtonLink({
  href,
  children,
  variant = "secondary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <a
      className={[
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-black transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember max-sm:w-full",
        variant === "primary"
          ? "bg-ember text-white shadow-[0_16px_38px_rgba(216,75,42,0.28)] hover:bg-[#c63f22]"
          : "border border-white/20 bg-white/10 text-white hover:bg-white/15",
      ].join(" ")}
      href={href}
    >
      {children}
    </a>
  );
}

function SectionHeading({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-10 grid items-end gap-7 md:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.55fr)] md:gap-16">
      <h2 className="text-[clamp(2rem,5vw,3.625rem)] leading-[1.05] font-black tracking-normal text-white">
        {title}
      </h2>
      <p className="text-base text-mist">{children}</p>
    </div>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-20 flex items-center justify-between gap-6 border-b border-white/10 bg-charcoal/75 px-[clamp(18px,4vw,56px)] py-4 backdrop-blur-lg max-sm:px-4"
      aria-label="主导航"
    >
      <a className="flex min-w-max items-center gap-3 font-black tracking-normal" href="#top" aria-label="黑铁工厂首页">
        <span className="grid h-[42px] w-[42px] place-items-center rounded-lg bg-[conic-gradient(from_180deg,var(--ember),var(--brass),var(--teal),var(--ember))] text-white shadow-[0_10px_30px_rgba(216,75,42,0.26)]">
          <Icon className="h-7 w-7">
            <path d="M6 7v10" />
            <path d="M18 7v10" />
            <path d="M3 9v6" />
            <path d="M21 9v6" />
            <path d="M6 12h12" />
          </Icon>
        </span>
        <span className="max-sm:max-w-[7em] max-sm:leading-tight">黑铁工厂</span>
      </a>
      <nav
        id="navLinks"
        className={[
          "items-center gap-[clamp(12px,2vw,28px)] text-sm whitespace-nowrap text-smoke/80 md:flex",
          isOpen
            ? "absolute top-[calc(100%+1px)] right-0 left-0 flex flex-col items-start border-b border-white/10 bg-charcoal/95 p-5"
            : "hidden",
        ].join(" ")}
        aria-label="页面导航"
      >
        {navItems.map(([label, href]) => (
          <a
            key={href}
            className="relative py-2 after:absolute after:bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-ember after:transition-transform hover:after:scale-x-100"
            href={href}
            onClick={() => setIsOpen(false)}
          >
            {label}
          </a>
        ))}
      </nav>
      <button
        className="grid h-[42px] w-[42px] place-items-center rounded-lg border border-white/15 bg-white/10 text-white md:hidden"
        type="button"
        aria-label="打开导航"
        aria-expanded={isOpen}
        aria-controls="navLinks"
        onClick={() => setIsOpen((value) => !value)}
      >
        <Icon className="h-5 w-5">
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </Icon>
      </button>
    </header>
  );
}

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      className="hero-overlay relative isolate grid min-h-[92vh] items-end overflow-hidden bg-[#0f1113] px-[clamp(18px,5vw,72px)] pt-[130px] pb-[72px] max-sm:min-h-[86vh] max-sm:px-4 max-sm:pt-28 max-sm:pb-24"
      aria-label="黑铁工厂健身房主视觉"
    >
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image}
            className={`hero-slide ${index === activeSlide ? "is-active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>
      <div className="relative z-10 w-full max-w-[760px]">
        <p className="mb-4 text-xs font-black tracking-[0.18em] text-[#ffd7bd] uppercase">自由重量 · 力量训练 · 铁馆氛围</p>
        <h1 className="max-w-[12ch] text-[clamp(3rem,8vw,7.25rem)] leading-[0.92] font-black tracking-normal text-white">
          把每一次训练都练到有数。
        </h1>
        <p className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.375rem)] leading-relaxed text-smoke/82">
          黑铁工厂是一家面向力量训练爱好者的硬核健身房，提供深蹲架、硬拉平台、举重区、体能区和一对一训练规划。
        </p>
        <div className="mt-8 flex flex-wrap gap-3 max-sm:flex-col">
          <ButtonLink href="#contact" variant="primary">
            <Icon className="h-5 w-5">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </Icon>
            预约免费体验
          </ButtonLink>
          <ButtonLink href="#pricing">
            <Icon className="h-5 w-5">
              <path d="M20 7h-9" />
              <path d="M14 17H5" />
              <circle cx="17" cy="17" r="3" />
              <circle cx="7" cy="7" r="3" />
            </Icon>
            查看会员方案
          </ButtonLink>
        </div>
      </div>
      <div
        className="absolute right-[clamp(18px,5vw,72px)] bottom-9 z-10 flex items-center gap-2.5 max-sm:right-4 max-sm:bottom-7"
        aria-label="店内环境轮播图"
      >
        {heroSlides.map((slide, index) => (
          <button
            key={slide.image}
            className={[
              "h-1.5 rounded-full border-0 p-0 transition-all duration-200",
              index === activeSlide ? "w-14 bg-ember" : "w-10 bg-white/35 hover:bg-white/55",
            ].join(" ")}
            type="button"
            aria-label={slide.label}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <div className="grid grid-cols-4 border-y border-white/10 bg-[#141719] px-[clamp(18px,5vw,72px)] max-md:grid-cols-2 max-sm:grid-cols-1" aria-label="场馆数据">
      {stats.map(([value, label]) => (
        <div key={value} className="min-h-32 border-r border-white/10 px-5 py-6 last:border-r-0 max-sm:min-h-24">
          <strong className="block text-[clamp(1.75rem,4vw,2.75rem)] leading-none font-black text-white">{value}</strong>
          <span className="mt-2.5 block text-sm text-mist">{label}</span>
        </div>
      ))}
    </div>
  );
}

function TrainingSection() {
  return (
    <section id="training" className="scroll-mt-24 px-[clamp(18px,5vw,72px)] py-[clamp(72px,8vw,118px)]">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading title="清晰、扎实、可持续的训练体系">
          从动作评估到周期计划，我们关注的不只是练得累，而是力量、体态和恢复能力一起往前走。
        </SectionHeading>
        <div className="grid items-stretch gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="training-photo min-h-[520px] border border-white/10 max-md:min-h-[420px]" role="img" aria-label="力量训练区照片" />
          <div className="grid gap-3.5">
            {programs.map((program) => (
              <article key={program.title} className="grid grid-cols-[auto_1fr] items-start gap-4 rounded-lg border border-white/12 bg-white/[0.055] p-5 max-sm:grid-cols-1">
                <div className="grid h-[46px] w-[46px] place-items-center rounded-lg border border-ember/35 bg-ember/20 text-white">
                  <Icon>{program.icon}</Icon>
                </div>
                <div>
                  <h3 className="mb-1.5 text-xl font-black text-white">{program.title}</h3>
                  <p className="text-[15px] text-mist">{program.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EquipmentSection() {
  return (
    <section id="equipment" className="scroll-mt-24 bg-[#e7ebee] px-[clamp(18px,5vw,72px)] py-[clamp(72px,8vw,118px)] text-[#171a1d]">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 grid items-end gap-7 md:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.55fr)] md:gap-16">
          <h2 className="text-[clamp(2rem,5vw,3.625rem)] leading-[1.05] font-black tracking-normal text-[#111416]">器械不花哨，但够硬</h2>
          <p className="text-base text-[#4b565f]">重点投入在自由重量、训练平台和耐用设备上，减少排队，让训练节奏更完整。</p>
        </div>
        <div className="grid grid-cols-4 gap-3.5 max-md:grid-cols-2 max-sm:grid-cols-1">
          {equipment.map((item) => (
            <article key={item.title} className="flex min-h-40 flex-col justify-between rounded-lg border border-charcoal/10 bg-white p-5 shadow-[0_10px_26px_rgba(16,18,20,0.08)]">
              <Icon className="h-7 w-7 text-teal">{item.icon}</Icon>
              <div>
                <h3 className="mb-1.5 text-[19px] font-black text-charcoal">{item.title}</h3>
                <p className="text-sm text-[#59646c]">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoachesSection() {
  return (
    <section id="coaches" className="scroll-mt-24 px-[clamp(18px,5vw,72px)] py-[clamp(72px,8vw,118px)]">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading title="教练不是喊口号的人">
          我们更在意动作质量、训练记录和可执行计划。你会知道今天为什么这样练，下一步怎么加。
        </SectionHeading>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
          {coaches.map((coach) => (
            <article key={coach.name} className="overflow-hidden rounded-lg border border-white/12 bg-white/[0.06]">
              <div
                className="aspect-[4/3] bg-cover bg-center"
                role="img"
                aria-label={coach.label}
                style={{ backgroundImage: `url(${coach.image})` }}
              />
              <div className="p-5">
                <h3 className="mb-1 text-[22px] font-black text-white">{coach.name}</h3>
                <div className="mb-4 text-sm font-extrabold text-[#ffd7bd]">{coach.role}</div>
                <p className="text-[15px] text-mist">{coach.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScheduleSection() {
  const [activeDay, setActiveDay] = useState<SessionDay>("mon");

  return (
    <section id="schedule" className="schedule-bg scroll-mt-24 px-[clamp(18px,5vw,72px)] py-[clamp(72px,8vw,118px)]">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading title="本周小班安排">点击日期切换课程。小班人数有限，体验课建议提前一天预约。</SectionHeading>
        <div className="grid items-start gap-6 md:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg border border-white/15 bg-white/[0.07] p-7 backdrop-blur-md">
            <h3 className="mb-4 text-[28px] font-black text-white">选择训练日</h3>
            <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="课程日期">
              {dayTabs.map((day) => (
                <button
                  key={day.key}
                  className={[
                    "min-h-[42px] min-w-[76px] rounded-lg border px-4 font-extrabold transition",
                    activeDay === day.key
                      ? "border-ember bg-ember text-white"
                      : "border-white/20 bg-white/10 text-smoke/85 hover:bg-white/15",
                  ].join(" ")}
                  type="button"
                  role="tab"
                  aria-selected={activeDay === day.key}
                  onClick={() => setActiveDay(day.key)}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-3" aria-live="polite">
            {sessions[activeDay].map(([time, title, description, seats]) => (
              <article key={`${time}-${title}`} className="grid min-h-20 grid-cols-[92px_1fr_auto] items-center gap-4 rounded-lg border border-white/12 bg-charcoal/75 px-4 py-3 max-sm:grid-cols-1 max-sm:gap-1.5">
                <time className="font-black text-brass">{time}</time>
                <div>
                  <h4 className="mb-0.5 text-lg font-black text-white">{title}</h4>
                  <p className="text-sm text-mist">{description}</p>
                </div>
                <span className="min-w-16 text-right text-[13px] font-extrabold text-[#ffd7bd] max-sm:text-left">{seats}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-24 px-[clamp(18px,5vw,72px)] py-[clamp(72px,8vw,118px)]">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading title="会员方案直接一点">没有复杂套路，按你能稳定训练的频率选择。首次到店可做一次动作评估。</SectionHeading>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
          {pricing.map((plan) => (
            <article
              key={plan.name}
              className={[
                "relative rounded-lg border p-7",
                plan.featured
                  ? "border-ember/60 bg-[linear-gradient(180deg,rgba(216,75,42,0.2),rgba(255,255,255,0.06))] shadow-[0_22px_60px_rgba(216,75,42,0.12)]"
                  : "border-white/12 bg-white/[0.06]",
              ].join(" ")}
            >
              <div className="mb-4 inline-flex text-[13px] font-black text-[#ffd7bd]">{plan.label}</div>
              <h3 className="mb-2 text-2xl font-black text-white">{plan.name}</h3>
              <div className="my-6 flex items-end gap-1.5 text-white">
                <strong className="text-5xl leading-[0.9] font-black">{plan.price}</strong>
                <span className="text-mist">{plan.unit}</span>
              </div>
              <ul className="mb-7 grid list-none gap-3 p-0 text-[15px] text-mist">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Icon className="mt-1 h-4.5 w-4.5 shrink-0 text-teal">
                      <path d="m20 6-11 11-5-5" />
                    </Icon>
                    {feature}
                  </li>
                ))}
              </ul>
              <ButtonLink href="#contact" variant={plan.featured ? "primary" : "secondary"}>
                {plan.action}
              </ButtonLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section id="reviews" className="scroll-mt-24 px-[clamp(18px,5vw,72px)] pt-0 pb-[clamp(72px,8vw,118px)]">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading title="到店会员的真实反馈">
          我们把评价写得具体一点：训练目标、上课感受、器械排队和教练跟进，这些才是决定能不能长期练下去的东西。
        </SectionHeading>
        <div className="grid grid-cols-5 gap-3.5 max-md:grid-cols-2 max-sm:grid-cols-1">
          {reviews.map(([quote, author, meta]) => (
            <article key={author} className="flex min-h-[262px] flex-col justify-between rounded-lg border border-white/12 bg-white/[0.06] p-5">
              <div>
                <div className="mb-4 text-base leading-none tracking-normal text-brass" aria-label="五星评价">
                  ★★★★★
                </div>
                <blockquote className="text-[15px] leading-relaxed text-smoke/90">{quote}</blockquote>
              </div>
              <div className="mt-5 border-t border-white/10 pt-4">
                <strong className="block text-[15px] text-white">{author}</strong>
                <span className="mt-1 block text-[13px] text-mist">{meta}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 px-[clamp(18px,5vw,72px)] pt-0 pb-[clamp(72px,8vw,118px)]">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-stretch gap-[clamp(28px,5vw,60px)] rounded-lg border border-white/15 bg-[#f1f3f4] p-[clamp(28px,5vw,56px)] text-[#141719] shadow-[0_24px_80px_rgba(0,0,0,0.34)] md:grid-cols-[1fr_0.85fr]">
          <div>
            <h2 className="mb-3.5 text-[clamp(2rem,5vw,3.625rem)] leading-[1.04] font-black text-charcoal">到淮源大道 26 号，跟着导航就能到。</h2>
            <p className="text-[17px] text-[#4d5961]">
              门店位于南京市溧水区淮源大道 26 号。到店前直接在地图软件搜索完整地址，抵达后认准沿街门头，第一次来建议预留 5 分钟找停车和入口。
            </p>
            <div className="mt-7 grid gap-3.5">
              <ContactRow>
                <Icon className="mt-0.5 h-5.5 w-5.5 shrink-0 text-ember">
                  <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </Icon>
                江苏省南京市溧水区淮源大道 26 号
              </ContactRow>
              <ContactRow>
                <Icon className="mt-0.5 h-5.5 w-5.5 shrink-0 text-ember">
                  <path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z" />
                  <path d="M9 3v15" />
                  <path d="M15 6v15" />
                </Icon>
                导航搜索：淮源大道 26 号，选择南京市溧水区的结果
              </ContactRow>
              <ContactRow>
                <Icon className="mt-0.5 h-5.5 w-5.5 shrink-0 text-ember">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </Icon>
                周一至周日 06:30 - 23:00
              </ContactRow>
            </div>
            <ol className="mt-6 grid list-none gap-3 p-0">
              {[
                ["打开高德或百度地图", "输入“江苏省南京市溧水区淮源大道 26 号”，按当前位置开始导航。"],
                ["到达淮源大道后留意门头", "沿淮源大道靠近 26 号门牌，看到健身房门头即可进店。"],
                ["第一次来建议提前一点", "预留停车、步行和确认入口的时间，进店后前台会引导参观训练区。"],
              ].map(([title, description], index) => (
                <li key={title} className="grid grid-cols-[34px_1fr] items-start gap-3 rounded-lg border border-charcoal/10 bg-white/65 p-3.5">
                  <b className="grid h-[34px] w-[34px] place-items-center rounded-lg bg-[#141719] text-sm text-white">{index + 1}</b>
                  <div>
                    <strong className="block text-[15px] leading-snug text-[#141719]">{title}</strong>
                    <span className="mt-1 block text-sm leading-normal text-[#5b666d]">{description}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="grid min-h-full grid-rows-[auto_1fr_auto] overflow-hidden rounded-lg border border-charcoal/10 bg-[#111416] text-white shadow-[0_18px_44px_rgba(16,18,20,0.16)]" aria-label="黑铁工厂健身房位置地图">
            <div className="flex items-center justify-between gap-3.5 bg-white/[0.06] p-4.5">
              <span className="text-xs font-extrabold tracking-normal text-smoke/65">门店位置</span>
              <strong className="text-right text-lg leading-tight text-white">
                南京溧水
                <br />
                淮源大道 26 号
              </strong>
            </div>
            <div className="relative min-h-[360px] overflow-hidden bg-[#182024]">
              <Image
                src="/assets/store-location-map.png"
                alt="黑铁工厂健身房位于南京市溧水区淮源大道26号的现代风格地图"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-wrap justify-start gap-3 bg-[#0f1214] p-4.5">
              <MapAction href="https://uri.amap.com/search?keyword=江苏省南京市溧水区淮源大道26号" primary>
                <Icon className="h-4.5 w-4.5">
                  <path d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </Icon>
                高德导航
              </MapAction>
              <MapAction href="https://map.baidu.com/search/江苏省南京市溧水区淮源大道26号">
                <Icon className="h-4.5 w-4.5">
                  <path d="m3 11 18-8-8 18-2-8-8-2Z" />
                </Icon>
                百度地图
              </MapAction>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ children }: { children: ReactNode }) {
  return <div className="flex items-start gap-3.5 font-bold text-[#2c343a]">{children}</div>;
}

function MapAction({ href, children, primary = false }: { href: string; children: ReactNode; primary?: boolean }) {
  return (
    <a
      className={[
        "inline-flex min-h-[42px] items-center gap-2 rounded-lg px-3.5 text-sm font-extrabold text-white",
        primary ? "bg-ember" : "bg-white/10 hover:bg-white/15",
      ].join(" ")}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0c0e10] px-[clamp(18px,5vw,72px)] pt-7 pb-10 text-sm text-smoke/60">
      <div className="mx-auto flex w-full max-w-6xl justify-between gap-4 max-sm:flex-col">
        <span>© 2026 黑铁工厂健身房</span>
        <span>力量、秩序、长期主义</span>
      </div>
    </footer>
  );
}

export function FitnessHome() {
  return (
    <div className="page-shell">
      <Header />
      <main id="top">
        <Hero />
        <StatsStrip />
        <TrainingSection />
        <EquipmentSection />
        <CoachesSection />
        <ScheduleSection />
        <PricingSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
