let images = {
  "O(1)":
    "https://res.cloudinary.com/dh2wmc2jz/image/upload/v1722927862/O_1_l7ioum.png",
  "O(logn)":
    "https://res.cloudinary.com/dh2wmc2jz/image/upload/v1722926813/O_LogN_zowhsp.png",
  "O(2^n)":
    "https://res.cloudinary.com/dh2wmc2jz/image/upload/v1722927899/O_2_N_r64s53.png",
  "O(N!)":
    "https://res.cloudinary.com/dh2wmc2jz/image/upload/v1722927930/O_n_t1ohrr.png",
  "O(N)":
    "https://res.cloudinary.com/dh2wmc2jz/image/upload/v1722928060/O_N_tu6bxl.png",
  "O(N^2)":
    "https://res.cloudinary.com/dh2wmc2jz/image/upload/v1722927867/O_n_2_c03yqc.png",
  "O(N^3)":
    "https://res.cloudinary.com/dh2wmc2jz/image/upload/v1722927868/O_N_3_b0pcff.png",
  "O(NlogN)":
    "https://res.cloudinary.com/dh2wmc2jz/image/upload/v1722927868/O_NLogN_c9vlny.png",
};

// Convert object to string representation
let str = Object.entries(images)
  .map(([key, value]) => `${key}: ${value}`)
  .join(", ");

console.log(str);
