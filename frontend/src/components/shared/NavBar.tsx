// import { useState } from "react"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import { BsLayoutSidebar } from "react-icons/bs";
import { useState } from "react";

// interface User {
//     registrationNumber: string;
//     firstName: string;
//     lastName: string;
//     role: string;
//   }

const NavBar = () => {

    const location = useLocation();
    const isLoginRoute = location.pathname === "/login";


    // const [image, setImage] = useState("");
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [role, setRole] = useState("");

    //testing
    const [image, setImage] = useState("img");
    const [firstName, setFirstName] = useState("Johnny");
    const [lastName, setLastName] = useState("Danny");
    const [role, setRole] = useState("admin");



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


    return (
        <div>
            <div className="flex items-center justify-between " >
                <div className="flex p-3 items-center ">
                    {!isLoginRoute && (
                        <Sheet>
                            <SheetTrigger><BsLayoutSidebar size={25} /></SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>
                                        <Link to="/" >
                                        app name here
                                        </Link>
                                        </SheetTitle>
                                    <SheetDescription>
                                        This action cannot be undone.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="flex flex-col py-5">
                                    <SheetClose className="mb-4" asChild>
                                        <Link to="/setup-test">
                                            <Button>Setup Question</Button>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link to="/student-overview">
                                            <Button>Student Overview</Button>
                                        </Link>
                                    </SheetClose>
                                </div>
                            </SheetContent>
                        </Sheet>
                    )}
                    <div className="p-3">
                        <Link className=" text-3xl font-semibold " to="/">
                        Navbar here
                        </Link>
                    </div>
                </div>

                <div className="flex items-center p-3 xl:mr-10 " >
                    <div className=" mr-2 rounded-full border p-3 " >
                        {image}
                    </div>
                    <div>
                        <h2 className="text-semibold opacity-80" > {`${lastName} ${firstName}`} </h2>
                        <p>{role}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar
