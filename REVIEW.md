# Soal 1 : Slicing

-   Skor : 6.5
-   Screenshot : https://i.imgur.com/BJMhiAA.png
-   Sistem : laravel + inertia + tailwind
-   [] Slicing : simple, masih bisa dirapikan lagi kotak gambar di ganti image
-   [] struktur folder : dibuat partial component

# Soal 2 : Master Data Repeatable

-   Skor : 6
-   Screenshot : https://i.imgur.com/LZ7U54e.png
-   sistem : Laravel + inertia + tailwind
-   Struktur Code :

    -   PSR-4
    -   Tabel sudah menggunakan laravel migration
    -   Dummy sudah menggunakan laravel seeder
    -   Model menggunakan eloquent untuk relasi antar tabel
    -   Controller sangat rapi, menggunakan db transaction untuk proses simpan data
    -   [] masih bisa di improve pemanggilan kelas lain ke dalam contructor function di controller

-   List :

    -   [] Data dummy > 20 data dengan laravel seeder
    -   [] Paginasi menggunakan php, ada sedikit bug ketika di filter
    -   Terdapat tombol add, edit & delete data, selain filter
    -   Filter
        -   daterange sudah berjalan.
        -   [] daterange bisa di improve lagi menggunakan jquery daterange
        -   kategori sudah berjalan sesuai ekspektasi
        -   text sudah berjalan sesuai ekspektasi
    -   [] Delete btn sudah menggunakan konfirmasi (Y/N)

    -   Bug/minor :
        -   [] Paginasi link masih belum sesuai : https://i.imgur.com/hvxrdC8.png
        -   [] Counter masih belum sesuai : https://i.imgur.com/tLg8mGK.png
        -   [] Kolom belum bisa di sort ASC/DESC : https://i.imgur.com/iZAuvgA.png
        -   [] daterange : format bisa diubah (d/m/Y),
        -   [] endDate seharusnya tidak bisa pilih tanggal < startdate https://i.imgur.com/VocO65q.png

-   Add :

    -   Repeater sudah lancar
    -   Store sudah berjalan sesuai ekspektasi
    -   Re populate data sudah berjalan sesuai ekpektasi
    -   Validasi saat store data dengan Error message

    -   Bug/minor :
        -   [] Repeater belum ada tombol delete row : https://i.imgur.com/DQ9LirL.png

-   Edit :

    -   Repeater sudah berjalan
    -   Re populate data sudah berjalan

    -   Bug/minor :

        -   [] Validasi : masih belum berjalan
        -   [] Proses : masih belum berjalan dengan lancar.
        -   [] Update proccess masih belum lancar : ketika mengubah data di deskripsi, maupun di repeater https://i.imgur.com/bwZDAZ8.png

-   Delete :

    -   sudah berjalan.

    -   Bug/minor :
        -   [] Belum ada dialog konfirmasi sebelum menghapus (Y/N).

# Soal 3 : Soal Logika

-   Screenshot : https://i.imgur.com/schSbGS.png
-   Score : 7
-   Sistem : Laravel + Inertia + Tailwind

-   Kode berfungsi dengan baik
-   Form input angka 1 dan angka 2
-   Hasil perhitungan
