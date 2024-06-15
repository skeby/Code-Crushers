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

const NavBar = () => {

    const location = useLocation();
    const isLoginRoute = location.pathname === "/login";


    // const [image, setImage] = useState("");
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [role, setRole] = useState("");

    //fetch account users details

    // useEffect(() => {
    //   const fetchStudents = async () => {
    //     try {
    //       setLoading(true);
    //       const response = await axios.get<Student[]>('https://api.example.com/students');

    //       if (Array.isArray(response.data)) {
    //         setStudents(response.data);
    //       } else {
    //         console.error('Invalid data format received from API');
    //       }

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
            <div className="p-3">Navbar here</div>
            {!isLoginRoute && (
                <Sheet>
                    <SheetTrigger>Open</SheetTrigger>
                    <SheetContent side={"left"}>
                        <SheetHeader>
                            <SheetTitle>Are you absolutely sure?</SheetTitle>
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
        </div>
    )
}

export default NavBar
