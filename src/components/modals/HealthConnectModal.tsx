
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Apple, Link, HeartPulse, Footsteps, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface HealthConnectModalProps {
    onClose: () => void;
}

const HealthConnectModal = ({ onClose }: HealthConnectModalProps) => {
    const { toast } = useToast();

    const handleConnect = (serviceName: string) => {
        toast({
            title: `Connexion à ${serviceName}`,
            description: "Cette fonctionnalité est en cours de développement.",
        });
    }

    const services = [
        { name: 'Apple Health', icon: <Apple /> },
        { name: 'Google Fit', icon:  <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.01 5.51L6.72 2.22A6.98 6.98 0 00 5.03 8.24l5.6 3.23c.31-1.03.88-1.95 1.62-2.73a3.83 3.83 0 01-.24-.23zm7.23 9.48l-5.6-3.23c-.31 1.03-.88 1.95-1.62 2.73.1.08.19.16.24.23l5.28 3.29a6.98 6.98 0 001.69-6.02zM8.25 5.03L9.68 5.9l-3.23 5.6c-1.03.31-1.95.88-2.73 1.62a3.83 3.83 0 01-.23-.24L2.22 6.7a6.98 6.98 0 016.03-1.67zm9.48 7.23l-1.43-.87 3.23-5.6c1.03-.31 1.95-.88 2.73-1.62.08.1.16.19.23.24l1.27 6.12a6.98 6.98 0 01-6.03 1.73z" />
                            </svg> },
    ]

    return (
        <div>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Link className="text-accent" />
                    Connecter vos services de santé
                </CardTitle>
                <CardDescription className="text-white/70">
                    Synchronisez automatiquement vos données depuis Apple Health, Google Fit, etc. (Fonctionnalité en cours de développement)
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {services.map((service, index) => (
                    <motion.div
                        key={service.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Card className="bg-black/20 border-white/20">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-medium flex items-center gap-2">
                                    {service.icon} {service.name}
                                </CardTitle>
                                <Button onClick={() => handleConnect(service.name)}>Connecter</Button>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-white/60">Synchronisez vos pas, rythme cardiaque, sommeil, et plus.</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
                 <div className="pt-4 text-center">
                    <Button variant="outline" onClick={onClose} className="bg-white/20 border-white/30 hover:bg-white/30">
                        Fermer
                    </Button>
                </div>
            </CardContent>
        </div>
    );
}

export default HealthConnectModal;
