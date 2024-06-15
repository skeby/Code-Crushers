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

const NavBar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const isStudent = user?.type === "Student";

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col sm:flex-row lg:px-12 px-5 py-2 items-center justify-between w-full border-b dark:border-secondary border-primary">
        <Logo className="order-1 sm:order-none w-full sm:w-auto mb-4 sm:mb-0" />
        <div className="flex order-3 gap-x-1 sm:gap-x-10 sm:order-none justify-between items-center sm:w-auto w-full">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center sm:gap-x-2 gap-x-1">
              {(isStudent ? studentPages : teacherPages).map((page, i) => (
                <NavigationMenuItem key={i}>
                  <NavLink to={page.path}>
                    {({ isActive }) => (
                      <div
                        className={`${navigationMenuTriggerStyle()}${
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
          <div className="flex items-center justify-center gap-x-2">
            <ModeToggle />
            <Popover>
              <PopoverTrigger>
                <Avatar className="size-8 sm:size-9">
                  <AvatarImage
                    src="https://github.com/skeby.png"
                    alt="@skeby"
                  />
                  <AvatarFallback className="font-medium">
                    {user?.firstName[0].concat(user?.lastName[0])}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60" align="end">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      {user?.firstName} {user?.lastName}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.type}
                    </p>
                  </div>
                  <Button onClick={() => handleLogout()} className="h-8">
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
