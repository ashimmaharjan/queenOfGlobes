import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { ToastContainer, toast } from "react-toastify";
import { IoAdd } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

function GalleryForm() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await fetch("/api/gallery/add", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Image added to gallery successfully.");

        // Reset Form
        setName("");
        setImage(null);
        onOpenChange(false);

        const fileInput = document.getElementById("file-input");
        if (fileInput) {
          fileInput.value = "";
        }

        // Fetch the updated gallery images after adding a new image
        fetchImages();
      } else {
        toast.error(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/gallery/images");
      const data = await response.json();
      if (response.ok) {
        setGalleryImages(data);
      } else {
        console.error("Failed to fetch gallery images");
      }
    } catch (error) {
      console.error("Error fetching gallery images");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/gallery/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Image deleted successfully.");
        // Fetch the updated gallery images after deletion
        fetchImages();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete image.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <section className="py-10">
      <button
        onClick={onOpen}
        className="flex justify-center items-center px-5 py-2 bg-sky-500 text-white ml-auto mb-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-sky-600 hover:shadow-inner gap-2"
      >
        <IoAdd />
        Add Image
      </button>
      <Table aria-label="Gallery Images Table">
        <TableHeader>
          <TableColumn>S.N.</TableColumn>
          <TableColumn>Image Name</TableColumn>
          <TableColumn>Image</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {galleryImages.map((image, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{image.name}</TableCell>
              <TableCell>
                <img
                  src={image.src}
                  alt={image.name}
                  className="h-16 w-16 object-cover"
                  loading="lazy"
                />
              </TableCell>
              <TableCell>
                <Button
                  color="danger"
                  variant="solid"
                  onClick={() => handleDelete(image.id)}
                  startContent={<MdDeleteOutline size={20} />}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Add Gallery Image
              </ModalHeader>
              <ModalBody>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Image Name"
                  required
                  className="w-full h-[56px] rounded-lg border border-gray-700 text-gray-700 px-5 text-lg mb-3"
                />
                <input
                  id="file-input"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                  className="text-gray-700"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Add
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>

      <ToastContainer />
    </section>
  );
}

export default GalleryForm;
