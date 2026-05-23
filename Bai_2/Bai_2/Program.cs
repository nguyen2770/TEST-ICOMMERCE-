using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bai_2
{
    internal class Program
    {
        static void Main(string[] args)
        {

            // khởi tạo dữ liệu 
            List<Student> students = new List<Student>
            {
                new Student { Name = "Nguyễn Văn An", Score = new Score { Math = 9, Chemistry = 8, Physic = 7 } },
                new Student { Name = "Trần Thị Bình", Score = new Score { Math = 6, Chemistry = 7, Physic = 8 } },
                new Student { Name = "Lê Hoàng Minh", Score = new Score { Math = 10, Chemistry = 9, Physic = 10 } },
                new Student { Name = "Phạm Gia Huy", Score = new Score { Math = 5, Chemistry = 6, Physic = 5 } },
                new Student { Name = "Đỗ Ngọc Lan", Score = new Score { Math = 8, Chemistry = 9, Physic = 8 } }
            };

            foreach (var student in students)
            {
                Console.WriteLine(student.ToString());
            }

            Console.WriteLine("");


            // săp xếp 
            Student.CustomSort(students);

            foreach (var student in students)
            {
                Console.WriteLine(student.ToString());
            }
            Console.WriteLine("");

            // tìm kiếm học sinh có điểm trung bình > 8

            var studentsScore8 = Student.BinarySearchAverage8(students);

            Console.WriteLine(studentsScore8);


        }
    }
}
