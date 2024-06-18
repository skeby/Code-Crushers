import ScreenLoader from "@/components/ScreenLoader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiCall } from "@/services";
import { paths } from "@/services/static";
import { useQuery } from "@tanstack/react-query";

interface Student {
  matricNumber: string;
  firstName: string;
  lastName: string;
  program: string;
  examStartTime: string;
  examEndTime: string;
  scoreNumber: number;
}

// Dummy student data
const students: Student[] = [
  {
    matricNumber: "2021001",
    firstName: "John",
    lastName: "Doe",
    program: "Computer Science",
    examStartTime: "10:00 AM",
    examEndTime: "12:00 PM",
    scoreNumber: 85,
  },
  {
    matricNumber: "2021002",
    firstName: "Jane",
    lastName: "Smith",
    program: "Electrical Engineering",
    examStartTime: "09:30 AM",
    examEndTime: "11:30 AM",
    scoreNumber: 78,
  },
  {
    matricNumber: "2021003",
    firstName: "Michael",
    lastName: "Brown",
    program: "Mechanical Engineering",
    examStartTime: "11:15 AM",
    examEndTime: "01:15 PM",
    scoreNumber: 92,
  },
];

const StudentOverview = () => {
  const { data, isFetching, isPending } = useQuery({
    queryKey: ["students"],
    queryFn: (data) => apiCall(data, paths.teacher.getAllStudents, "get"),
  });

  console.log(data)
  const totalScoreNumber = students.reduce(
    (acc, student) => acc + student.scoreNumber,
    0
  );
  const totalScorePercentage = totalScoreNumber / students.length;
  // const [loading, setLoading] = useState(false);
  // const [students, setStudents] = useState<Student[]>([]);

  //student data retrieving simulation

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
      <ScreenLoader loading={isFetching || isPending} />
      <div className="">
        <Table>
          <TableCaption>Students Performance Overview</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Matric Number</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Exam Start Time</TableHead>
              <TableHead>Exam End Time</TableHead>
              <TableHead>Score (Number/70)</TableHead>
              <TableHead>Score (Percentage)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.matricNumber}</TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.program}</TableCell>
                <TableCell>{student.examStartTime}</TableCell>
                <TableCell>{student.examEndTime}</TableCell>
                <TableCell>{student.scoreNumber}</TableCell>
                <TableCell>
                  {((student.scoreNumber / 100) * 100).toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>Class Average</TableCell>
              <TableCell>{totalScorePercentage.toFixed(2)}%</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default StudentOverview;
