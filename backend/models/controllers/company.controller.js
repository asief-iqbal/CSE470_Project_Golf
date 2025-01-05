// import cloudinary from "../../utils/cloudinary.js";
// import getDataUri from "../../utils/datauri.js";
import { Company } from "../company.model.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false,
            });
        }

        if (!req.id) {
            return res.status(401).json({
                message: "Unauthorized. User ID is missing.",
                success: false,
            });
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "This company is already registered.",
                success: false,
            });
        }

        company = await Company.create({
            name: companyName,
            userId: req.id, // Ensure `req.id` is properly set by `isAuthenticated`
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
            success: false,
        });
    }
};


export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // Ensure `req.id` is set by `isAuthenticated`

        const companies = await Company.find({ userId });
        if (!companies.length) {
            return res.status(404).json({
                message: "No companies found.",
                success: false,
            });
        }

        return res.status(200).json({
            companies,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
            success: false,
        });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        return res.status(200).json({
            company,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
            success: false,
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;

        // //cloudinary
        // const fileUri = getDataUri(file);
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        // const logo = cloudResponse.secure_url;


        const updateData = { name, description, website, location};
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully.",
            company,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
            success: false,
        });
    }
};
