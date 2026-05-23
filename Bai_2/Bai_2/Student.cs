using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bai_2
{
    public class Student
    {
        public string Name { get; set; }
        public Score Score { get; set; }

 

        public double Average()
        {
            return (Score.Math + Score.Physic + Score.Chemistry) / 3.0;
        }

        public override string ToString()
        {
            return $"Name: {Name}, Math: {Score.Math}, Physic: {Score.Physic}, Chemistry: {Score.Chemistry}, Average: {Average():F2}";
        }


        public static void CustomSort(List<Student> list)
        {
            for (int i = 0; i < list.Count - 1; i++)
            {
                for (int j = 0; j < list.Count - i - 1; j++)
                {
                    var avg_j = list[j].Average();
                    var avg_j1 = list[j + 1].Average();

                    if (
                        avg_j < avg_j1 ||
                        (Math.Abs(avg_j - avg_j1) < 0.0001 && String.Compare(list[j].Name, list[j + 1].Name, StringComparison.Ordinal) > 0)
                       )
                    {
        
                        var tmp = list[j];
                        list[j] = list[j + 1];
                        list[j + 1] = tmp;
                    }
                }
            }
        }

        public static Student BinarySearchAverage8(List<Student> sortedList)
        {
            int left = 0;
            int right = sortedList.Count - 1;
            double target = 8.0;
            Student result = null;

            while (left <= right)
            {
                int mid = (left + right) / 2;
                double avg = sortedList[mid].Average();

                if (Math.Abs(avg - target) < 0.0001)
                {
                    // Có thể có nhiều object cùng điểm TB 8, cần tìm object đầu tiên trong dãy
                    result = sortedList[mid];
                    // Nếu cần lấy object đầu tiên (ở đầu mảng), tiếp tục dịch sang trái
                    right = mid - 1;
                }
                else if (avg > target)
                {
                    left = mid + 1;   
                }
                else
                {
                    right = mid - 1;
                }
            }

            return result;
        }

    }
}
