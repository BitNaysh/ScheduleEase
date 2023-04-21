from django.contrib import admin
from django.urls import path
from . import views
from . import serializer

urlpatterns = [
    path('', views.index, name='index'),
    path('about', views.about, name='about'),
    path('help', views.help, name='help'),
    path('terms', views.terms, name='terms'),
    path('contact', views.contact, name='contact'),

    path('admin_dashboard', views.admindash, name='admindash'),

    path('add_teachers', views.addInstructor, name='addInstructors'),
    path('teachers_list/', views.inst_list_view, name='editinstructor'),
    path('delete_teacher/<int:pk>/',
         views.delete_instructor, name='deleteinstructor'),

    path('add_rooms', views.addRooms, name='addRooms'),
    path('rooms_list/', views.room_list, name='editrooms'),
    path('delete_room/<int:pk>/', views.delete_room, name='deleteroom'),

    path('add_timings', views.addTimings, name='addTimings'),
    path('timings_list/', views.meeting_list_view, name='editmeetingtime'),
    path('delete_meetingtime/<str:pk>/',
         views.delete_meeting_time, name='deletemeetingtime'),

    path('add_courses', views.addCourses, name='addCourses'),
    path('courses_list/', views.course_list_view, name='editcourse'),
    path('delete_course/<str:pk>/', views.delete_course, name='deletecourse'),

    path('add_departments', views.addDepts, name='addDepts'),
    path('departments_list/', views.department_list, name='editdepartment'),
    path('delete_department/<int:pk>/',
         views.delete_department, name='deletedepartment'),

    path('add_sections', views.addSections, name='addSections'),
    path('sections_list/', views.section_list, name='editsection'),
    path('delete_section/<str:pk>/', views.delete_section, name='deletesection'),

    path('generate_timetable', views.generate, name='generate'),

    path('timetable_generation/', views.timetable, name='timetable'),
    # path('timetable_generation/render/pdf', views.Pdf, name='pdf'),


    #Instructor Urls
     path('api/instructors', serializer.InstructorList.as_view(),
           name="api_instructor_list"),
     path('api/instructors/<str:pk>/', serializer.InstructorDetail.as_view(),
          name="api_instructor_detail"),

     #Room urls 
     path('api/rooms', serializer.RoomList.as_view(), name="api_room_list"),
     path('api/rooms/<int:pk>/', serializer.RoomDetail.as_view(),
          name="api_room_detail"),

     #Meeting Time urls
     path('api/meetingtimes', serializer.MeetingTimeList.as_view(),
          name="api_meetingtime_list"),
     path('api/meetingtimes/<str:pk>/', serializer.MeetingTimeDetail.as_view(),
          name="api_meetingtime_detail"),
     
     #courses urls
     path('api/courses', serializer.CourseList.as_view(), name="api_course_list"),
     path('api/courses/<str:pk>/', serializer.CourseDetail.as_view(), name="api_course_detail"),


     #department urls
     path('api/departments', serializer.DepartmentList.as_view(), name="api_department_list"),
     path('api/departments/<int:pk>/', serializer.DepartmentDetail.as_view(), name="api_department_detail"),


     #section urls
    path('api/sections',
         serializer.SectionList.as_view(), name="api_section_list"),
    path('api/sections/<str:pk>/', serializer.SectionDetail.as_view(),
         name="api_section_detail"),
     
     #timetable generation
     path('api/timetable_generation', views.Timetable.as_view(), name = "api_timetable_generation"),

     path('api/time_slots', views.TimeSlot.as_view(), name= "time_slots")
      

]
