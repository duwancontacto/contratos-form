import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchStep from "../search-step";
import { individualAutoPopulateProfile } from "../../../../services/search";
import toast from "react-hot-toast";

// Mock the external dependencies
jest.mock("../../../../services/search", () => ({
  individualAutoPopulateProfile: jest.fn(),
}));
jest.mock("react-hot-toast");

// Mock data
const mockPatientData = [
  {
    data: {
      results: true,
      contacts: [
        {
          datosGenerales: {
            nombre: "Juan",
            apellidoPaterno: "Pérez",
            apellidoMaterno: "García",
            idExterno: "12345",
            sexo: "Masculino",
            tipo: "TITULAR",
          },
          listaCorreoElectronico: [
            {
              correroElectronico: "juan.perez@example.com",
            },
          ],
          listaTelefonos: [
            {
              telefono: {
                NumeroTelefonico: "5555555555",
                IDExterno: "phone123",
              },
            },
          ],
          listaDireccion: [
            {
              direccion: {
                estado: "ESTADO DE MEXICO",
                calle: "Av. Reforma",
                numeroExterior: "123",
                numeroInterior: "4A",
                colonia: "Centro",
                codigoPostal: "06500",
                delgacionMunicipio: "Cuauhtémoc",
                ciudad: "Ciudad de México",
                referncias: "Entre calles",
                id_externo: "addr123",
                latitud: "19.4326",
                longitud: "-99.1332",
              },
            },
          ],
        },
      ],
    },
  },
  {
    data: {
      results: true,
      contacts: [
        {
          datosGenerales: {
            nombre: "Juan",
            apellidoPaterno: "Pérez",
            apellidoMaterno: "García",
            idExterno: "12345",
            sexo: "Masculino",
            tipo: "TITULAR",
          },
          listaCorreoElectronico: [
            {
              correroElectronico: "juan.perez@example.com",
            },
          ],
          listaTelefonos: [
            {
              telefono: {
                NumeroTelefonico: "5555555555",
                IDExterno: "phone123",
              },
            },
          ],
          listaDireccion: [
            {
              direccion: {
                estado: "ESTADO DE MEXICO",
                calle: "Av. Reforma",
                numeroExterior: "123",
                numeroInterior: "4A",
                colonia: "Centro",
                codigoPostal: "06500",
                delgacionMunicipio: "Cuauhtémoc",
                ciudad: "Ciudad de México",
                referncias: "Entre calles",
                id_externo: "addr123",
                latitud: "19.4326",
                longitud: "-99.1332",
              },
            },
          ],
        },
      ],
    },
  },
];

const mockEmptyResult = [
  {
    data: {
      results: false,
    },
  },
  {
    data: {
      results: false,
    },
  },
];

describe("SearchStep Component", () => {
  const mockSetValue = jest.fn();
  const mockSetData = jest.fn();
  const mockExternalReset = jest.fn();
  const mockNextStep = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the search form correctly", () => {
    render(
      <SearchStep
        setValue={mockSetValue}
        setData={mockSetData}
        externalReset={mockExternalReset}
        nextStep={mockNextStep}
      />
    );

    expect(screen.getByLabelText(/número de tarjeta/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /buscar/i })).toBeInTheDocument();
  });

  it("shows validation errors for required fields", async () => {
    render(
      <SearchStep
        setValue={mockSetValue}
        setData={mockSetData}
        externalReset={mockExternalReset}
        nextStep={mockNextStep}
      />
    );

    const submitButton = screen.getByRole("button", { name: /buscar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/número de tarjeta requerido/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/correo electrónico requerido/i)
      ).toBeInTheDocument();
    });

    // Test for tarjeta length validation
    const cardInput = screen.getByLabelText(/número de tarjeta/i);
    fireEvent.change(cardInput, { target: { value: "123" } });

    const submitButton2 = screen.getByRole("button", { name: /buscar/i });
    fireEvent.click(submitButton2);

    await waitFor(() => {
      expect(screen.getByText(/Debe tener 13 dígitos/i)).toBeInTheDocument();
    });
  });

  it("handles successful patient search", async () => {
    (individualAutoPopulateProfile as jest.Mock).mockResolvedValue(
      mockPatientData
    );

    render(
      <SearchStep
        setValue={mockSetValue}
        setData={mockSetData}
        externalReset={mockExternalReset}
        nextStep={mockNextStep}
      />
    );

    // Fill in the form
    const cardInput = screen.getByLabelText(/número de tarjeta/i);
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const submitButton = screen.getByRole("button", { name: /buscar/i });

    fireEvent.change(cardInput, {
      target: { value: "1234567890123" },
    });
    fireEvent.change(emailInput, {
      target: { value: "juan.perez@example.com" },
    });

    // Submit the form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(individualAutoPopulateProfile).toHaveBeenCalledWith(
        "juan.perez@example.com",
        "1234567890123"
      );
    });

    await waitFor(() => {
      expect(mockSetValue).toHaveBeenCalledWith("first_name", "Juan");
      expect(mockSetValue).toHaveBeenCalledWith("last_name1", "Pérez");
      expect(mockSetValue).toHaveBeenCalledWith("last_name2", "García");
      expect(mockSetValue).toHaveBeenCalledWith(
        "email",
        "juan.perez@example.com"
      );
      expect(mockSetValue).toHaveBeenCalledWith("state", "MEXICO");
      expect(mockNextStep).toHaveBeenCalledWith(true);
    });

    expect(toast.success).toHaveBeenCalledWith("Paciente encontrado!");
  });

  it("handles case when patient is not found", async () => {
    (individualAutoPopulateProfile as jest.Mock).mockResolvedValue(
      mockEmptyResult
    );

    render(
      <SearchStep
        setValue={mockSetValue}
        setData={mockSetData}
        externalReset={mockExternalReset}
        nextStep={mockNextStep}
      />
    );

    // Fill in the form
    const cardInput = screen.getByLabelText(/número de tarjeta/i);
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const submitButton = screen.getByRole("button", { name: /buscar/i });

    fireEvent.change(cardInput, {
      target: { value: "1234567890123" },
    });
    fireEvent.change(emailInput, {
      target: { value: "not.found@example.com" },
    });

    // Submit the form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockExternalReset).toHaveBeenCalled();
      expect(mockSetData).toHaveBeenCalledWith({});
      expect(mockNextStep).toHaveBeenCalledWith(false);
      expect(mockSetValue).toHaveBeenCalledWith(
        "email",
        "not.found@example.com"
      );
      expect(mockSetValue).toHaveBeenCalledWith("tarjeta", "1234567890123");
    });

    expect(toast).toHaveBeenCalledWith("Prosiga a ingresar sus datos.", {
      icon: "👨‍⚕️",
    });
  });

  it("handles API error gracefully", async () => {
    (individualAutoPopulateProfile as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );

    render(
      <SearchStep
        setValue={mockSetValue}
        setData={mockSetData}
        externalReset={mockExternalReset}
        nextStep={mockNextStep}
      />
    );

    // Fill in the form
    const cardInput = screen.getByLabelText(/número de tarjeta/i);
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const submitButton = screen.getByRole("button", { name: /buscar/i });

    fireEvent.change(cardInput, {
      target: { value: "1234567890123" },
    });
    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });

    // Submit the form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockExternalReset).toHaveBeenCalled();
      expect(mockSetData).toHaveBeenCalledWith({});
    });

    expect(toast).toHaveBeenCalledWith("Prosiga a ingresar sus datos.", {
      icon: "👨‍⚕️",
    });
  });

  it("shows email confirmation when registered email is different and accepts the email", async () => {
    const mockPatientWithDifferentEmail = [...mockPatientData];
    mockPatientWithDifferentEmail[0].data.contacts[0].listaCorreoElectronico[0].correroElectronico =
      "another@example.com";

    (individualAutoPopulateProfile as jest.Mock).mockResolvedValue(
      mockPatientWithDifferentEmail
    );

    render(
      <SearchStep
        setValue={mockSetValue}
        setData={mockSetData}
        externalReset={mockExternalReset}
        nextStep={mockNextStep}
      />
    );

    // Fill in the form
    const cardInput = screen.getByLabelText(/número de tarjeta/i);
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const submitButton = screen.getByRole("button", { name: /buscar/i });

    fireEvent.change(cardInput, {
      target: { value: "1234567890123" },
    });
    fireEvent.change(emailInput, {
      target: { value: "different@example.com" },
    });

    // Submit the form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Ya tiene un correo asociado a esta tarjeta/i)
      ).toBeInTheDocument();
      expect(screen.getByText("another@example.com")).toBeInTheDocument();
    });

    // Test email choice buttons
    fireEvent.click(screen.getByRole("button", { name: /sí, continuar/i }));

    await waitFor(() => {
      expect(mockNextStep).toHaveBeenCalledWith(true);
    });
  });

  it("shows email confirmation when registered email is different and rejects the email", async () => {
    const mockPatientWithDifferentEmail = [...mockPatientData];
    mockPatientWithDifferentEmail[0].data.contacts[0].listaCorreoElectronico[0].correroElectronico =
      "another@example.com";

    (individualAutoPopulateProfile as jest.Mock).mockResolvedValue(
      mockPatientWithDifferentEmail
    );

    render(
      <SearchStep
        setValue={mockSetValue}
        setData={mockSetData}
        externalReset={mockExternalReset}
        nextStep={mockNextStep}
      />
    );

    // Fill in the form
    const cardInput = screen.getByLabelText(/número de tarjeta/i);
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const submitButton = screen.getByRole("button", { name: /buscar/i });

    fireEvent.change(cardInput, {
      target: { value: "1234567890123" },
    });
    fireEvent.change(emailInput, {
      target: { value: "different@example.com" },
    });

    // Submit the form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Ya tiene un correo asociado a esta tarjeta/i)
      ).toBeInTheDocument();
      expect(screen.getByText("another@example.com")).toBeInTheDocument();
    });

    // Test email choice buttons
    fireEvent.click(screen.getByRole("button", { name: /no, modificarlo/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Para modificar su información/i)
      ).toBeInTheDocument();
    });
  });
});
