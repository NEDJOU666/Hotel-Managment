import React, { useState } from 'react';
import styled from 'styled-components';

interface Pricing {
    id: number;
    roomType: string;
    price: number;
    discount: number;
    seasonalRate: string;
}

const PricingContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff; /* White background */
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    text-align: center;
    color: #28a745; /* Green color */
    margin-bottom: 20px;
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
`;

const Form = styled.form`
    display: grid;
    gap: 10px;
    margin-bottom: 20px;
    background-color: #f7f7f7; /* Light grey background for form */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    font-size: 14px;
    color: #333; /* Darker grey for text */
`;

const Input = styled.input`
    padding: 10px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ddd;
    margin-top: 5px;
`;

const Button = styled.button<{ variant?: string }>`
    padding: 10px 15px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${({ variant }) => (variant === 'delete' ? '#dc3545' : variant === 'edit' ? '#28a745' : '#007BFF')}; /* Green and red colors */
    color: white;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ variant }) => (variant === 'delete' ? '#c82333' : variant === 'edit' ? '#218838' : '#0056b3')}; /* Darker green and red */
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
`;

const TableHeader = styled.th`
    padding: 10px;
    background-color: #28a745; /* Green color */
    color: white;
    border: 1px solid #ddd;
`;

const TableData = styled.td`
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
`;

const ErrorMessage = styled.p`
    color: #dc3545; /* Red color for errors */
    font-size: 12px;
`;

// Function to format numbers as dollars
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

const Pricing: React.FC = () => {
    const [pricingData, setPricingData] = useState<Pricing[]>([]);
    const [roomType, setRoomType] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [discount, setDiscount] = useState<number | ''>('');
    const [seasonalRate, setSeasonalRate] = useState('');
    const [selectedPricing, setSelectedPricing] = useState<Pricing | null>(null);
    const [error, setError] = useState('');

    const validateForm = (): boolean => {
        if (!roomType || price === '' || discount === '' || !seasonalRate) {
            setError('All fields are required.');
            return false;
        }

        if (price <= 0 || discount < 0) {
            setError('Price must be greater than 0 and discount must be non-negative.');
            return false;
        }

        setError('');
        return true;
    };

    const handleAddPricing = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const newPricing: Pricing = {
            id: Date.now(),
            roomType,
            price: Number(price),
            discount: Number(discount),
            seasonalRate,
        };

        setPricingData([...pricingData, newPricing]);
        resetForm();
    };

    const handleEditPricing = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (!selectedPricing) return;

        const updatedPricing: Pricing = {
            ...selectedPricing,
            roomType,
            price: Number(price),
            discount: Number(discount),
            seasonalRate,
        };

        setPricingData(
            pricingData.map(pricing => 
                pricing.id === updatedPricing.id ? updatedPricing : pricing
            )
        );
        resetForm();
    };

    const handleDeletePricing = (id: number) => {
        setPricingData(pricingData.filter(pricing => pricing.id !== id));
    };

    const handleSelectPricing = (pricing: Pricing) => {
        setSelectedPricing(pricing);
        setRoomType(pricing.roomType);
        setPrice(pricing.price);
        setDiscount(pricing.discount);
        setSeasonalRate(pricing.seasonalRate);
    };

    const resetForm = () => {
        setRoomType('');
        setPrice('');
        setDiscount('');
        setSeasonalRate('');
        setSelectedPricing(null);
    };

    return (
        <PricingContainer>
            <Title>Pricing Management</Title>

            <Form onSubmit={selectedPricing ? handleEditPricing : handleAddPricing}>
                <FormGroup>
                    <Label>Room Type</Label>
                    <Input type="text" value={roomType} onChange={(e) => setRoomType(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Price</Label>
                    <Input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        placeholder="$0.00"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Discount</Label>
                    <Input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(parseFloat(e.target.value))}
                        placeholder="$0.00"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Seasonal Rate</Label>
                    <Input type="text" value={seasonalRate} onChange={(e) => setSeasonalRate(e.target.value)} />
                </FormGroup>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button type="submit">{selectedPricing ? 'Save Changes' : 'Add Pricing'}</Button>
            </Form>

            <Table>
                <thead>
                    <tr>
                        <TableHeader>Room Type</TableHeader>
                        <TableHeader>Price</TableHeader>
                        <TableHeader>Discount</TableHeader>
                        <TableHeader>Seasonal Rate</TableHeader>
                        <TableHeader>Actions</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {pricingData.map(pricing => (
                        <tr key={pricing.id}>
                            <TableData>{pricing.roomType}</TableData>
                            <TableData>{formatCurrency(pricing.price)}</TableData>
                            <TableData>{formatCurrency(pricing.discount)}</TableData>
                            <TableData>{pricing.seasonalRate}</TableData>
                            <TableData>
                                <ActionButtons>
                                    <Button variant="edit" onClick={() => handleSelectPricing(pricing)}>Edit</Button>
                                    <Button variant="delete" onClick={() => handleDeletePricing(pricing.id)}>Delete</Button>
                                </ActionButtons>
                            </TableData>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </PricingContainer>
    );
};

export default Pricing;
