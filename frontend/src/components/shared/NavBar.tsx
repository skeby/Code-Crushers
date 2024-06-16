import { Button } from "../ui/button";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { studentPages, teacherPages } from "@/static";
import Logo from "../Logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { clearUser } from "@/state/slices/authSlice";
import { ModeToggle } from "../ui/mode-toggle";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useMediaQuery } from "usehooks-ts";
import { useState } from "react";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isStudent = user?.role === "Student";

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div className="flex items-center justify-between h-full">
      <div className="flex flex-row lg:px-12 h-full px-5 py-2 items-center justify-between w-full border-b overflow-x-auto overflow-y-hidden dark:border-secondary border-primary gap-x-1">
        {/* TODO: Find a way to always show the logo even when the menu is open on mobile */}
        {(!isMenuOpen || !isMobile) && <Logo />}
        {(isMenuOpen || !isMobile) && (
          <NavigationMenu className="">
            <NavigationMenuList className="flex items-center sm:gap-x-2 gap-x-0.5 !p-0">
              {(isStudent ? studentPages : teacherPages).map((page, i) => (
                <NavigationMenuItem key={i}>
                  <NavLink to={page.path}>
                    {({ isActive }) => (
                      <div
                        className={`!h-6 !py-1 !rounded-full !px-2.5 ${navigationMenuTriggerStyle()}${
                          isActive
                            ? " dark:bg-primary bg-primary dark:text-secondary text-secondary"
                            : " bg-transparent"
                        }`}
                      >
                        {page.name}
                      </div>
                    )}
                  </NavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}
        <div className="flex items-center justify-center gap-x-2">
          {(!isMenuOpen || !isMobile) && (
            <>
              <ModeToggle />
              <Popover>
                <PopoverTrigger>
                  <Avatar className="relative size-8 sm:size-9">
                    <div className="relative">
                      <AvatarImage
                        src="https://github.com/skeby.png"
                        alt="@skeby"
                        className="w-full h-full"
                      />
                      <div className="absolute top-0 right-0 bottom-0 left-0 bg-accent opacity-0 transition-opacity hover:opacity-50"></div>
                    </div>
                    <AvatarFallback className="font-medium">
                      {user?.firstName[0].concat(user?.lastName[0])}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-60" align="end">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-x-2">
                        <Avatar className="relative size-11 sm:size-9">
                          <AvatarImage
                            src="https://github.com/skeby.png"
                            alt="@skeby"
                            className="w-full h-full"
                          />
                          <AvatarFallback className="font-medium">
                            {user?.firstName[0].concat(user?.lastName[0])}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col justify-between">
                          <h4 className="font-medium">
                            {user?.firstName} {user?.lastName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {user?.role}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => handleLogout()} className="h-8">
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}
          {isMobile && (
            <Button
              variant={"ghost"}
              className="size-8 sm:size-9 p-0 rounded-full"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <HamburgerMenuIcon />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
