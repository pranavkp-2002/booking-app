"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/actions/auth.actions";
import { headingFont, slotlyFonts } from "@/components/fonts";
import { ROLES } from "@/utils/roles";

const ROLE_LINK = {
  [ROLES.USER]: { href: "/my-bookings", label: "My bookings" },
  [ROLES.SHOP]: { href: "/shop", label: "Shop dashboard" },
  [ROLES.SUPER_ADMIN]: { href: "/admin", label: "Admin" },
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E7C6B]";
const btn = `h-11 items-center justify-center rounded-[10px] px-4 text-sm font-semibold ${focusRing}`;
const btnGhost = `${btn} text-[#12151A] hover:bg-[#F0F2F5]`;
const btnPrimary = `${btn} bg-[#0E7C6B] text-white hover:bg-[#0A5E51]`;
const menuItem =
  "flex min-h-10 w-full cursor-pointer items-center rounded-lg px-3 text-left text-sm text-[#12151A] hover:bg-[#F0F2F5] focus-visible:bg-[#F0F2F5] focus-visible:outline-none";

/** Links shown in the bar and the drawer. */
function navLinks(user) {
  const links = [{ href: "/", label: "Explore" }];
  if (user && ROLE_LINK[user.role]) links.push(ROLE_LINK[user.role]);
  if (user === null) links.push({ href: "/register", label: "For businesses" });
  return links;
}

function Avatar({ name }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#E3F3EF] font-bold text-[#0E7C6B]"
    >
      {name?.[0]?.toUpperCase() ?? "?"}
    </span>
  );
}

function LogoutButton({ className, ...props }) {
  return (
    <form action={logoutAction}>
      <button type="submit" className={`${className} text-[#B42318]`} {...props}>
        Log out
      </button>
    </form>
  );
}

/**
 * user: undefined while loading (shows only the public shell), null when logged out.
 */
export default function NavbarClient({ user }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);

  // Close both menus after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setDrawerOpen(false);
    setMenuOpen(false);
  }

  // Escape closes the drawer; growing back to desktop width closes it too.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 861px)");
    const onResize = (m) => m.matches && setDrawerOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [drawerOpen]);

  // The login page has its own full-screen brand panel instead of the navbar.
  if (pathname === "/login") return null;

  const links = navLinks(user);
  const isCurrent = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`${slotlyFonts} sticky top-0 z-50 border-b border-[#E3E6EB] bg-white text-[#12151A]`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[1200px] items-center gap-3 px-4 min-[861px]:h-[72px] min-[861px]:gap-6 min-[861px]:px-6"
      >
        <Link href="/" className={`flex flex-none items-center gap-2.5 rounded-lg ${focusRing}`}>
          <span
            aria-hidden="true"
            className={`${headingFont} flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-[#0E7C6B] font-bold text-white`}
          >
            S
          </span>
          <span className={`${headingFont} text-xl font-semibold`}>Slotly</span>
        </Link>

        <ul className="m-0 hidden flex-auto list-none gap-1 p-0 min-[861px]:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isCurrent(l.href) ? "page" : undefined}
                className={`flex h-10 items-center rounded-lg px-3 text-sm font-medium text-[#3A404C] hover:bg-[#F0F2F5] hover:text-[#12151A] aria-[current=page]:bg-[#F0F2F5] aria-[current=page]:font-semibold aria-[current=page]:text-[#12151A] ${focusRing}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex flex-none items-center gap-2 min-[861px]:ml-0">
          {user === null && (
            <>
              <Link href="/login" className={`${btnGhost} hidden min-[861px]:inline-flex`}>
                Log in
              </Link>
              <Link href="/register" className={`${btnPrimary} hidden min-[861px]:inline-flex`}>
                Sign up
              </Link>
            </>
          )}

          {user && (
            <ProfileMenu user={user} open={menuOpen} setOpen={setMenuOpen} />
          )}

          <button
            ref={toggleRef}
            type="button"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            aria-controls="nav-drawer"
            onClick={() => setDrawerOpen((o) => !o)}
            className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#E3E6EB] bg-white hover:bg-[#F0F2F5] min-[861px]:hidden ${focusRing}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d={drawerOpen ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"} />
            </svg>
          </button>
        </div>
      </nav>

      {drawerOpen && (
        <div id="nav-drawer" className="border-t border-[#E3E6EB] bg-white px-4 pt-3 pb-5 min-[861px]:hidden">
          {user && (
            <div className="mb-2 flex items-center gap-3 rounded-xl bg-[#F5F6F8] p-3">
              <Avatar name={user.name} />
              <span>
                <strong className="block text-[15px]">{user.name}</strong>
                <span className="text-[13px] text-[#5A6170]">{user.email}</span>
              </span>
            </div>
          )}
          <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isCurrent(l.href) ? "page" : undefined}
                  className={`flex min-h-12 items-center rounded-[10px] px-3 text-base font-medium text-[#3A404C] aria-[current=page]:bg-[#F0F2F5] aria-[current=page]:font-semibold aria-[current=page]:text-[#12151A] ${focusRing}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {user && (
              <>
                <li>
                  <hr className="my-2 h-px border-0 bg-[#E3E6EB]" />
                </li>
                <li>
                  <LogoutButton
                    className={`flex min-h-12 w-full cursor-pointer items-center rounded-[10px] px-3 text-left text-base font-medium ${focusRing}`}
                  />
                </li>
              </>
            )}
          </ul>
          {user === null && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link href="/login" className={`${btnGhost} flex h-12 border border-[#E3E6EB]`}>
                Log in
              </Link>
              <Link href="/register" className={`${btnPrimary} flex h-12`}>
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

function ProfileMenu({ user, open, setOpen }) {
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const focusFirst = useRef(false);

  const items = () => [...(menuRef.current?.querySelectorAll('[role="menuitem"]') ?? [])];

  useEffect(() => {
    if (!open) return;
    if (focusFirst.current) {
      items()[0]?.focus();
      focusFirst.current = false;
    }
    const onClick = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open, setOpen]);

  const onMenuKey = (e) => {
    const list = items();
    const i = list.indexOf(document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      list[(i + 1) % list.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      list[(i - 1 + list.length) % list.length]?.focus();
    } else if (e.key === "Escape") {
      setOpen(false);
      btnRef.current?.focus();
    }
  };

  const roleLink = ROLE_LINK[user.role];

  return (
    <div ref={wrapRef} className="relative hidden min-[861px]:block">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="profile-menu"
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            focusFirst.current = true;
            setOpen(true);
          }
        }}
        className={`flex h-11 cursor-pointer items-center gap-2 rounded-full border border-[#E3E6EB] bg-white pr-2.5 pl-1.5 text-sm font-semibold hover:bg-[#F0F2F5] ${focusRing}`}
      >
        <Avatar name={user.name} />
        {user.name.split(" ")[0]}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          ref={menuRef}
          id="profile-menu"
          role="menu"
          onKeyDown={onMenuKey}
          className="absolute top-[calc(100%+8px)] right-0 m-0 min-w-[220px] list-none rounded-xl border border-[#E3E6EB] bg-white p-1.5 shadow-[0_12px_32px_rgba(18,21,26,0.12)]"
        >
          <li role="none" className="mb-1 border-b border-[#E3E6EB] px-3 pt-2.5 pb-2">
            <strong className="block text-sm">{user.name}</strong>
            <span className="text-[13px] text-[#5A6170]">{user.email}</span>
          </li>
          {roleLink && (
            <li role="none">
              <Link role="menuitem" href={roleLink.href} className={menuItem}>
                {roleLink.label}
              </Link>
            </li>
          )}
          <li role="none" className="my-1 h-px bg-[#E3E6EB]" />
          <li role="none">
            <LogoutButton role="menuitem" className={menuItem} />
          </li>
        </ul>
      )}
    </div>
  );
}
