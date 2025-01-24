class HRService {
    constructor(Employee) {
        this.Employee = Employee;
    }

    async getActiveEmployees() {
        return await this.Employee.find({ status: 'active' });
    }

    async calculatePayroll(employees) {
        const payrollData = employees.map(employee => ({
            employeeId: employee.id,
            name: `${employee.firstName} ${employee.lastName}`,
            salary: employee.salary,
            department: employee.department
        }));

        const totalPayroll = payrollData.reduce((sum, emp) => sum + emp.salary, 0);
        return {
            employees: payrollData,
            totalPayroll,
            processedDate: new Date()
        };
    }

    async getEmployeeById(id) {
        return await this.Employee.findById(id);
    }

    async updateEmployee(id, employeeData) {
        return await this.Employee.findByIdAndUpdate(id, employeeData, { new: true });
    }
}

module.exports = HRService; 