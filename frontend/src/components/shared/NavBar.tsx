// import { useState } from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BsLayoutSidebar } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { studentPages, teacherPages } from "@/static";
import Logo from "../Logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
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
// import { useState } from "react";

// interface User {
//     registrationNumber: string;
//     firstName: string;
//     lastName: string;
//     role: string;
//   }

const NavBar = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { activePage } = useAppSelector((state) => state.ui);

  const isLoginRoute = location.pathname === "/login";
  const isStudent = user?.type === "Student";

  // const [image, setImage] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [role, setRole] = useState("");

  //testing
  // const image = "img"
  // const firstName = "John"
  // const lastName = "doey"
  // const role = "admin"

  //fetch account users details

  // useEffect(() => {
  //   const fetchStudents = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get<user[]>('https://api.example.com/students');

  // setImage("dummy image link");
  // setFirstName(response.data.firstName);
  // setLastName(response.data.lastName);
  // setRole(response.data.role);

  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching student data:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchStudents();
  // }, []);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex lg:px-12 px-5 py-2 items-center justify-between w-full border-b border-white">
        {/* <Sheet>
          <SheetTrigger>
            <BsLayoutSidebar size={25} />
          </SheetTrigger>
          <SheetContent side={"left"} className="w-[250px]">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-y-5 py-5">
              {isStudent
                ? studentPages.map((page, i) => (
                    <SheetClose key={i} asChild>
                      <Link to={page.path}>
                        <Button className="w-full">{page.name}</Button>
                      </Link>
                    </SheetClose>
                  ))
                : teacherPages.map((page, i) => (
                    <SheetClose key={i} asChild>
                      <Link to={page.path}>
                        <Button className="w-full">{page.name}</Button>
                      </Link>
                    </SheetClose>
                  ))}
            </div>
          </SheetContent>
        </Sheet> */}
        <Logo />
        <NavigationMenu>
          <NavigationMenuList className="flex">
            {(isStudent ? studentPages : teacherPages).map((page, i) => (
              <NavigationMenuItem>
                <NavLink to={page.path}>
                  {({ isActive }) => (
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()}${
                        isActive ? " bg-white text-black" : ""
                      }`}
                    >
                      {page.name}
                    </NavigationMenuLink>
                  )}
                </NavLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>
                {user?.firstName[0].concat(user?.lastName[0])}
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-60 mr-5 mt-1" side="bottom">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">
                  {user?.firstName} {user?.lastName}
                </h4>
                <p className="text-sm text-muted-foreground">{user?.type}</p>
              </div>
              <Button onClick={() => handleLogout()} className="h-8">
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default NavBar;
