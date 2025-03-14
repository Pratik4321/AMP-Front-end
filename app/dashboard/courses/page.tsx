"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CourseSection() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Business",
    "Arts",
  ];

  const popularCourses = [
    "Introduction to Programming",
    "Data Structures and Algorithms",
    "Machine Learning Basics",
    "Calculus I",
  ];

  const upcomingCourses = [
    "Advanced Python Programming (Starts Nov 15)",
    "Web Development Bootcamp (Starts Dec 1)",
    "Artificial Intelligence Fundamentals (Coming Soon)",
  ];

  const instructors = [
    { name: "John Doe", expertise: "Python Expert" },
    { name: "Jane Smith", expertise: "Data Science Guru" },
    { name: "Alice Johnson", expertise: "Web Development Pro" },
  ];

  const announcements = [
    "New Course: Advanced Python Programming",
    "Update: Machine Learning Course Now Available",
    "Event: Live Q&A with Instructor John Doe",
  ];

  return (
    <div className="p-6 bg-gray-50">
      <Card className="w-full max-w-6xl shadow-lg border border-gray-200 rounded-lg">
        <CardHeader className="bg-blue-50 p-6 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-blue-800">
            Course Section
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Course Categories */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Course Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="bg-white hover:bg-gray-100"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Popular Courses */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Popular Courses
            </h3>
            <ul className="space-y-2">
              {popularCourses.map((course, index) => (
                <li key={index} className="text-gray-600">
                  - {course}
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Courses */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Upcoming Courses
            </h3>
            <ul className="space-y-2">
              {upcomingCourses.map((course, index) => (
                <li key={index} className="text-gray-600">
                  - {course}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructor Spotlight */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Instructor Spotlight
            </h3>
            <ul className="space-y-2">
              {instructors.map((instructor, index) => (
                <li key={index} className="text-gray-600">
                  - {instructor.name}: {instructor.expertise}
                </li>
              ))}
            </ul>
          </div>

          {/* Course Announcements */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Course Announcements
            </h3>
            <ul className="space-y-2">
              {announcements.map((announcement, index) => (
                <li key={index} className="text-gray-600">
                  - {announcement}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
