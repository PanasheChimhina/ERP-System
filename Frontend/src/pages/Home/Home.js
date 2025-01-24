import React from 'react';
import Button from 'components/ui/Button';
import Card from 'components/ui/Card';
import CardContent from 'components/ui/CardContent';
import {
    Building2,
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users2,
    BadgeDollarSign,
    Settings
} from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <nav className="fixed w-full top-0 z-10 bg-gray-900 border-b border-gray-800">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <Building2 className="h-6 w-6" />
                            <span className="text-xl font-bold">RetailERP</span>
                        </div>
                        <div className="flex items-center space-x-8">
                            <span className="cursor-pointer">Features</span>
                            <span className="cursor-pointer">Solutions</span>
                            <span className="cursor-pointer">About</span>
                            <span className="cursor-pointer">Contact</span>
                            <Button variant="outline">Login</Button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pt-20">
                <div className="container mx-auto px-6 py-12 text-center">
                    <h1 className="text-4xl font-bold mb-6">
                        Unified Retail Management Solution
                    </h1>
                    <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                        Streamline your retail operations with our comprehensive ERP system.
                        Manage inventory, sales, procurement, and more across 100+ stores and multiple warehouses.
                    </p>
                    <div className="flex justify-center space-x-6">
                        <Button size="lg">Get Started</Button>
                        <Button size="lg" variant="outline">Schedule Demo</Button>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-16">
                    <h2 className="text-2xl font-bold text-center mb-12">Core Modules</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Package className="h-6 w-6" />,
                                title: "Inventory Management",
                                description: "Real-time stock tracking and automated reordering across all locations"
                            },
                            {
                                icon: <ShoppingCart className="h-6 w-6" />,
                                title: "Sales Management",
                                description: "Comprehensive POS integration and sales analytics"
                            },
                            {
                                icon: <Users2 className="h-6 w-6" />,
                                title: "HR Management",
                                description: "Employee scheduling, payroll, and performance tracking"
                            },
                            {
                                icon: <BadgeDollarSign className="h-6 w-6" />,
                                title: "Finance Management",
                                description: "Automated financial reporting and budget management"
                            },
                            {
                                icon: <LayoutDashboard className="h-6 w-6" />,
                                title: "Procurement",
                                description: "Streamlined supplier management and purchase orders"
                            },
                            {
                                icon: <Settings className="h-6 w-6" />,
                                title: "System Settings",
                                description: "Role-based access control and system configuration"
                            }
                        ].map((feature, index) => (
                            <Card key={index} className="bg-gray-800 border-gray-700 p-6">
                                <div className="space-y-4">
                                    <div className="text-blue-400">{feature.icon}</div>
                                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="container mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-blue-400 mb-2">100+</div>
                            <div className="text-gray-400">Retail Stores</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
                            <div className="text-gray-400">System Uptime</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-400 mb-2">&lt;2s</div>
                            <div className="text-gray-400">Response Time</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;