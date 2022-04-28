const canvas_width = window.innerWidth > 640 ? (window.innerWidth - 300) : window.innerWidth
const canvas_height = window.innerWidth > 640 ? window.innerHeight : (window.innerHeight - 48)

export const aspect_ratio = canvas_width / canvas_height