import qrcode
import json

taxi_data = [
    {
        "id": "1234567890",
        "name": "John Smith",
        "service": "Toronto Taxi Service",
        "model": "Toyota Camry",
        "color": "Red",
        "approved_by_taxiMate": True
    },
    {
        "id": "2345678901",
        "name": "Jane Doe",
        "service": "Diamond Taxi",
        "model": "Honda Civic",
        "color": "Blue",
        "approved_by_taxiMate": True
    },
    {
        "id": "3456789012",
        "name": "Bob Johnson",
        "service": "West-Way Taxi",
        "model": "Ford Escape",
        "color": "Black",
        "approved_by_taxiMate": True
    },
    {
        "id": "4567890123",
        "name": "Sarah Lee",
        "service": "Crown Taxi",
        "model": "Chevrolet Impala",
        "color": "White",
        "approved_by_taxiMate": True
    },
    {
        "id": "5678901234",
        "name": "Michael Chen",
        "service": "Beck Taxi",
        "model": "Hyundai Elantra",
        "color": "Silver",
        "approved_by_taxiMate": True
    },
    {
        "id": "6789012345",
        "name": "Jessica Brown",
        "service": "Toronto Taxi Service",
        "model": "Nissan Altima",
        "color": "Gray",
        "approved_by_taxiMate": True
    },
    {
        "id": "7890123456",
        "name": "David Lee",
        "service": "Diamond Taxi",
        "model": "Toyota Corolla",
        "color": "Green",
        "approved_by_taxiMate": True
    },
    {
        "id": "8901234567",
        "name": "Jennifer Lee",
        "service": "West-Way Taxi",
        "model": "Kia Optima",
        "color": "Blue",
        "approved_by_taxiMate": True
    },
    {
        "id": "9012345678",
        "name": "Samuel Kim",
        "service": "Crown Taxi",
        "model": "Honda Accord",
        "color": "Black",
        "approved_by_taxiMate": True
    },
    {
        "id": "0123456789",
        "name": "Emily Wang",
        "service": "Beck Taxi",
        "model": "Mazda CX-5",
        "color": "Red",
        "approved_by_taxiMate": True
    },
    {
        "id": "1111111111",
        "name": "Oliver Wang",
        "service": "Toronto Taxi Service",
        "model": "Toyota Prius",
        "color": "White",
        "approved_by_taxiMate": True
    },
    {
        "id": "2222222222",
        "name": "Sophia Kim",
        "service": "Diamond Taxi",
        "model": "Hyundai Sonata",
        "color": "Gray",
        "approved_by_taxiMate": True
    },
    {
        "id": "3333333333",
        "name": "William Lee",
        "service": "West-Way Taxi",
        "model": "Honda CRV",
        "color": "Black",
        "approved_by_taxiMate": False
    }]

# loop through each car and generate a QR code with its information
for i, car in enumerate(taxi_data):
    # convert the car's information to a JSON string with double quotes
    car_info = json.dumps(car, ensure_ascii=False)
    
    # generate the QR code and save it as a PNG image
    img = qrcode.make(car_info)
    img.save(f"qr-codes/codes/{i}.png")