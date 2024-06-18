import ScreenLoader from "@/components/ScreenLoader";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiCall } from "@/services";
import { paths } from "@/services/static";
import { useAppSelector } from "@/state/store";
import { useQueries } from "@tanstack/react-query";

const fetchStudentDetails = async (examId: string | null) => {
  const response = await apiCall(
    {},
    `${paths.teacher.getStudentsByExamId}/${examId}`,
    "get"
  );
  return response;
};

const StudentOverview = () => {
  const { user } = useAppSelector((state) => state.auth);
  const studentDetailsQueries = user?.createdExams
    ? useQueries({
        queries: user.createdExams.map((exam) => ({
          queryKey: [user.createdExams],
          queryFn: () => fetchStudentDetails(exam),
        })),
      })
    : null;
  const isQueryStudentDetailsLoading = studentDetailsQueries?.some(
    (query) => query.isLoading || query.isFetching
  );

  return (
    <div>
      <ScreenLoader loading={isQueryStudentDetailsLoading ?? false} />
      <div className="">
        {studentDetailsQueries &&
        user?.createdExams &&
        studentDetailsQueries?.length > 0 ? (
          <Table>
            <TableCaption>Students Performance Overview</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Exam ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentDetailsQueries.map((query, i) =>
                query?.data?.students?.map((student: any, j: number) => (
                  <TableRow key={j}>
                    <TableCell>{student?.firstName}</TableCell>
                    <TableCell>{student?.lastName}</TableCell>
                    <TableCell>{student?.email}</TableCell>
                    <TableCell>{user?.createdExams?.[i]}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        ) : (
          <Card>
            <CardHeader className="item-center justify-center flex">
              No Student Available
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentOverview;
