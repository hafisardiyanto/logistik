const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllGroups = async (req, res) => {
    try {
        const groups = await prisma.groupLayanan.findMany({
            where: { is_active: true }
        });
        res.json({
            success: true,
            data: groups
        });
    } catch (error) {
        console.error("Error fetching Group Layanan:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
