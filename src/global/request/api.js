const PREFIX = 'https://api.liuyinshe.zakesi.com/api'
// const PREFIX = '/api'

const API = {
  Login: `${PREFIX}/login`,
  manager: `${PREFIX}/manager`,
  managerId: (id) => `${PREFIX}/manager/${id}`,
  user: `${PREFIX}/user`,
  userId: (id) => `${PREFIX}/user/${id}`,
  integral: (type) => `${PREFIX}/integral/${type}`,
  qiniuToken: `${PREFIX}/qiniu/token`,
  QINIU_API: 'http://up.qiniup.com',
  course: `${PREFIX}/course`,
  courseId: (id) => `${PREFIX}/course/${id}`,
  teacher: `${PREFIX}/teacher`,
  teacherId: (id) => `${PREFIX}/teacher/${id}`,
  combo: `${PREFIX}/combo`,
  comboId: (id) => `${PREFIX}/combo/${id}`,
  comboPlan: `${PREFIX}/combo_plan`,
  comboPlanId: (id) => `${PREFIX}/combo_plan/${id}`,
  class: `${PREFIX}/class`,
  classId: (id) => `${PREFIX}/class/${id}`,
  lesson: `${PREFIX}/lesson`,
  lessonId: (id) => `${PREFIX}/lesson/${id}`,
  userPlan: `${PREFIX}/user_plan`,
  userPlanId: (id) => `${PREFIX}/user_plan/${id}`,
  total: (type) => `${PREFIX}/total/${type}`,
  classReferShow: `${PREFIX}/refer_show/class`,
  userLesson: `${PREFIX}/user_lesson`,
  userLessonID: id => `${PREFIX}/user_lesson/${id}`,
  payment: `${PREFIX}/payment`,
  leave: `${PREFIX}/leave`,
  leaveId: (id) => `${PREFIX}/leave/${id}`,
  paymentUser: `${PREFIX}/payment/user`
}

export default API
