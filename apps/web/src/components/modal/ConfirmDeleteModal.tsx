import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface ConfirmDeleteModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm:() => void
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm}) => {
    if(!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="border p-6 rounded shadow-lg bg-white dark:bg-gray-950">
            <h2 className="text-lg font-semibold py-2">Confirmar Exclusão</h2>
            <p>Tem certeza de que deseja excluir este registro?</p>
            <div className="flex justify-end gap-4 py-2">
                <Button size="xs" variant="outline" className="" onClick={onClose}>
                    Cancelar
                </Button>
                <Button size="xs" variant="outlineDestructive" className="py-2 text-inherit" onClick={onConfirm}>
                    Delete <Trash2 className="size-3 ml-2"/>
                </Button>
            </div>
        </div>
    </div>
    )
}

export default ConfirmDeleteModal;