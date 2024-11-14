import AppointmentModel from "../models/appointment.js";



export const createAppointment = async (req , res) =>{
    const {
      patientName,
      patientPhone,
      patientAge,
      problem,
      scheduleDate,
      scheduleTime,
      doctorName,
      doctorId,
    } = req.body;
    const userId = req.user.id;
    if(!patientName || !patientPhone || !patientAge || !problem || !scheduleDate || !scheduleTime || !doctorName || !doctorId){
        return res.status(422).json({message : "Please fill all the fields"});
    }

    try {
        const appointment = new AppointmentModel({
          patientName,
          patientPhone,
          patientAge,
          problem,
          scheduleDate,
          scheduleTime,
          doctorName,
          doctorId,
          userId,
          status : "pending",
        });
        await appointment.save();
        res.status(200).json({message : "Appointment booked successfully"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: " error while booking appointment" });
    }



}

export const getallappointments = async (req, res) => {
  const { id } = req.user;
  console.log(id);
  try {
    const patinet = await AppointmentModel.find({ userId: id});
    res.status(200).json({ patinet });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: " error while fetching patients" });
  }
};
export const Docgetallappointments = async (req, res) => {
  const { id } = req.user;
  console.log(id);
  try {
    const patinet = await AppointmentModel.find({ doctorId: id});
    res.status(200).json({ patinet });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: " error while fetching patients" });
  }
};
export const getallappointmentsconfirm = async (req, res) => {
  try {
    const patinet = await AppointmentModel.find({status : "confirmed"});
    res.status(200).json({ patinet });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: " error while fetching confirmed patients" });
  }
};

export const getallappointmentspending = async (req, res) => {
  try {
    const patinet = await AppointmentModel.find({status : "pending"});
    res.status(200).json({ patinet });
    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: " error while fetching pending patients" });
    }
}
export const getallappointmentscancel = async (req, res) => {
  try {
    const patinet = await AppointmentModel.find({ status: "cancelled" });
    res.status(200).json({ patinet });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: " error while fetching cancelled patients" });
  }
};

export const getallappointmentsTodayDate = async (req, res) => {
  const { id } = req.user;
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
        const day = String(currentDate.getDate()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;
        const patinet = await AppointmentModel.find({
          scheduleDate: formattedDate,
          userId: id,
        });
        res.status(200).json({ patinet });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: " error while fetching patients" });
    }
}
export const updateConfrimAppointment = async (req , res) =>{
  const {status , id} = req.body;
  try {
    await AppointmentModel.findByIdAndUpdate(id , {status : status});
    res.status(200).json({message : "Appointment updated successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: " error while updating appointment" });
  }
}