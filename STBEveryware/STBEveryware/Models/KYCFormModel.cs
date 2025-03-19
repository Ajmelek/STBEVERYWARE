namespace KYCFormAPI.Models
{
  public class KYCFormModel
  {
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string FatherFirstName { get; set; }
    public string FatherLastName { get; set; }
    public string Gender { get; set; }
    public string MaritalStatus { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Nationality { get; set; }
    public string Status { get; set; }
    public string PAN { get; set; }
    public string ProofOfIdentity { get; set; }
    public string CorrespondenceAddress { get; set; }
    public string AddressLine2 { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
    public string Country { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public string ProofOfAddress { get; set; }
    public string PermanentAddress { get; set; }
    public string Signature { get; set; }
    public DateTime DateSigned { get; set; }
  }
}
