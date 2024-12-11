import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Dialog, DialogContent } from "@mui/material";
import { Color } from "../../../assets/color";
import SupplierDetailDuringPurchase from "../../../components/modal/supplier-bid/SupplierDetailModal";
import ItemDetailModal from "../../../components/modal/purchase-entry/ItemDetailModal";
import * as SaleActions from "../../../redux/actions/saleAction";
import * as SupplierActions from "../../../redux/actions/supplierAction";
import * as ItemActions from "../../../redux/actions/itemAction";
import RouteHeader from "../../../components/common/RouteHeader";

export const SaleEntry = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { itemData } = useSelector(state => state?.itemReducer);
  const { supplierData } = useSelector(state => state?.supplierReducer);

  const { inputFieldDetailSale: inputFieldDetail, saleItemDetail } = useSelector(state => state?.saleReducer)
  const [inputFieldError, setInputFieldError] = useState({});

  //* Handle Input Field : Error
  const handleInputFieldError = (input, value) => {
    setInputFieldError((prev) => ({ ...prev, [input]: value }))
  };

  //* Handle Input Field : Data
  const handleInputField = (e) => {
    const { name, value } = e.target;
    dispatch(SaleActions.setInputFieldDetailSale({ ...inputFieldDetail, [name]: value }));
  };

  //* Supplier Modal 
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => { setModalOpen(true) };
  const handleModalClose = () => { setModalOpen(false) };

  //! Handle Supplier : Searching
  const handleSupplierDetail = (data) => {
    dispatch(SaleActions.setInputFieldDetailSale({ ...inputFieldDetail, supplier: data?.name, balance: data?.balance }))
  }

  //* Item Modal 
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const handleItemModalOpen = (index) => {
    setItemModalOpen(true)
    setcurrentIndex(index)
  };
  const handleItemModalClose = () => { setItemModalOpen(false) };
  const [currentIndex, setcurrentIndex] = useState(null);

  //! Insert Searched Data In Our Purchase Item Detail Field
  const handleSingleItemDetail = (data) => {
    console.log("Item Detail Data ::: ", data, currentIndex);
    const { name, minQty, id } = data;
    const newSaleItemDetail = [...saleItemDetail];
    newSaleItemDetail[currentIndex]['itemName'] = name;
    newSaleItemDetail[currentIndex]['qty'] = minQty;
    newSaleItemDetail[currentIndex]['itemId'] = id;
  }

  //* Onchange Handler For Purchase Item Detail 
  const handleSaleItemDetail = (index, field, value) => {
    const newSaleItemDetail = [...saleItemDetail];
    newSaleItemDetail[index][field] = value;
    if (field === "qty" || field === "purRate") {
      const qty = parseFloat(newSaleItemDetail[index].qty);
      const purRate = parseFloat(newSaleItemDetail[index].purRate);
      newSaleItemDetail[index].amount = (qty && purRate) ? (qty * purRate).toFixed(2) : "";
    }
    dispatch(SaleActions.setSaleItemDetail(newSaleItemDetail));
  };

  //! Onfocus Handler - Tracking Current Index For Adding Next Row Field 
  const handleFocusSaleItemDetail = (index) => {
    if (index === saleItemDetail.length - 1) handleAddSaleItemDetailField();
  };

  //* Function : Adding Next Row Field 
  const handleAddSaleItemDetailField = () => {
    dispatch(SaleActions.setSaleItemDetail([...saleItemDetail, { code: "", itemId: "", itemName: "", batch: "", exp: "", qty: "", fQty: "", purRate: "", dis: "", mrp: "", amount: '' }]));
  };

  const handleSubmit = () => {
    const filledsaleItemDetail = saleItemDetail.filter(row => row.amount && row.qty && row.purRate);
    console.log(filledsaleItemDetail);
  };

  useEffect(() => {
    //! Dispatching API For Getting Supplier 
    dispatch(SupplierActions.getSupplier());

    //! Dispatching API For Getting Item 
    dispatch(ItemActions.getItem());
  }, []);

  return (
    <>
      <div style={{ padding: "10px" }}>
        <RouteHeader title={'Sale Entry'} />
        <div style={{ backgroundColor: Color.white, padding: "20px", borderRadius: "10px", display: "flex", flexDirection: "column", gap: "50px" }}>
          <Grid container spacing={2}>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField label="Bill No." variant="outlined" fullWidth
                name="billNo"
                value={inputFieldDetail?.billNo}
                onChange={handleInputField}
                error={inputFieldError.billNo ? true : false}
                helperText={inputFieldError.billNo}
                onFocus={() => handleInputFieldError("billNo", null)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField label="Customer" variant="outlined" fullWidth
                name="customer"
                value={inputFieldDetail?.customer}
                onChange={handleInputField}
                onKeyDown={(e) => { e.key === 'Enter' && handleModalOpen() }}
                error={inputFieldError.customer ? true : false}
                helperText={inputFieldError.customer}
                onFocus={() => handleInputFieldError("customer", null)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField label="Customer Type" variant="outlined" fullWidth
                name="customerType"
                value={inputFieldDetail?.customerType}
                onChange={handleInputField}
                error={inputFieldError.customerType ? true : false}
                helperText={inputFieldError.customerType}
                onFocus={() => handleInputFieldError("customerType", null)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField label="Invoice" variant="outlined" fullWidth
                name="invoice"
                value={inputFieldDetail?.invoice}
                onChange={handleInputField}
                error={inputFieldError.invoice ? true : false}
                helperText={inputFieldError.invoice}
                onFocus={() => handleInputFieldError("invoice", null)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                label="System Date" variant="outlined" fullWidth type="date"
                name='systemDate'
                value={inputFieldDetail?.systemDate}
                onChange={handleInputField}
                error={inputFieldError.systemDate ? true : false}
                helperText={inputFieldError.systemDate}
                onFocus={() => handleInputFieldError("systemDate", null)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                label="Date" variant="outlined" fullWidth type="date"
                name='date'
                value={inputFieldDetail?.date}
                onChange={handleInputField}
                error={inputFieldError.date ? true : false}
                helperText={inputFieldError.date}
                onFocus={() => handleInputFieldError("date", null)}
                InputLabelProps={{ shrink: true }}
              // inputProps={{ min: HideDateFromCurrentFromToday() }}
              />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "20px 0" }}>
              <div style={{ border: `1px solid ${Color.borderColor}`, display: "flex", justifyContent: "center", gap: "20px", padding: "10px", borderRadius: "5px", height: "250px", overflowY: "scroll", }}>
                <table className="purchase-item-table">
                  <thead>
                    <tr style={{ textAlign: "center", backgroundColor: Color.primary, color: Color.white }}>
                      <td>Item Code</td><td>Item</td><td>Batch</td><td>Exp.</td><td>Qty.</td><td>F.Qty.</td><td>Sale Rate</td><td>Dis%</td><td>MRP</td><td>Amount</td>
                    </tr>
                  </thead>
                  <tbody>
                    {saleItemDetail.map((row, index) => (
                      <tr key={index}>
                        <td><input value={row.code} onChange={(e) => handleSaleItemDetail(index, 'itemCode', e.target.value)} onFocus={() => handleFocusSaleItemDetail(index)} disabled={index > 0 && saleItemDetail[index - 1].amount === ""} type="text" style={{ outline: "none", border: "none", width: "100px" }} /></td>
                        <td><input value={row.itemName} onChange={(e) => handleSaleItemDetail(index, 'item', e.target.value)} onFocus={() => handleFocusSaleItemDetail(index)} onKeyDown={(e) => { e.key === 'Enter' && handleItemModalOpen(index) }} disabled={index > 0 && saleItemDetail[index - 1].amount === ""} type="text" style={{ outline: "none", border: "none", width: "200px" }} /></td>
                        <td><input value={row.batch} onChange={(e) => handleSaleItemDetail(index, 'batch', e.target.value)} onFocus={() => handleFocusSaleItemDetail(index)} disabled={index > 0 && saleItemDetail[index - 1].amount === ""} type="text" style={{ outline: "none", border: "none" }} /></td>
                        <td><input value={row.exp} onChange={(e) => handleSaleItemDetail(index, 'exp', e.target.value)} onFocus={() => handleFocusSaleItemDetail(index)} disabled={index > 0 && saleItemDetail[index - 1].amount === ""} type="date" style={{ outline: "none", border: "none" }} /></td>
                        <td><input value={row.qty} onChange={(e) => handleSaleItemDetail(index, 'qty', e.target.value)} onFocus={() => handleFocusSaleItemDetail(index)} disabled={index > 0 && saleItemDetail[index - 1].amount === ""} type="text" style={{ outline: "none", border: "none" }} /></td>
                        <td><input value={row.fQty} onChange={(e) => handleSaleItemDetail(index, 'fQty', e.target.value)} onFocus={() => handleFocusSaleItemDetail(index)} disabled={index > 0 && saleItemDetail[index - 1].amount === ""} type="text" style={{ outline: "none", border: "none" }} /></td>
                        <td><input value={row.purRate} onChange={(e) => handleSaleItemDetail(index, 'saleRate', e.target.value)} onFocus={() => handleFocusSaleItemDetail(index)} disabled={index > 0 && saleItemDetail[index - 1].amount === ""} type="text" style={{ outline: "none", border: "none", width: "100px" }} /></td>
                        <td><input value={row.dis} onChange={(e) => handleSaleItemDetail(index, 'dis', e.target.value)} onFocus={() => handleFocusSaleItemDetail(index)} disabled={index > 0 && saleItemDetail[index - 1].amount === ""} type="text" style={{ outline: "none", border: "none" }} /></td>
                        <td><input value={row.mrp} onChange={(e) => handleSaleItemDetail(index, 'mrp', e.target.value)} onFocus={() => handleFocusSaleItemDetail(index)} disabled={index > 0 && saleItemDetail[index - 1].amount === ""} type="text" style={{ outline: "none", border: "none" }} /></td>
                        <td><input value={row.amount} readOnly type="text" style={{ outline: "none", border: "none" }} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Grid container sx={{ justifyContent: "flex-end" }}>
                <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 20px", borderRadius: "30px", cursor: "pointer", fontSize: "15px" }}>Submit</div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>

      <Dialog open={modalOpen}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <div onClick={() => handleModalClose()} style={{ cursor: "pointer" }}>X</div>
              </div>
            </Grid>

            <Grid item lg={12} sm={12} md={12} xs={12}>
              <SupplierDetailDuringPurchase data={supplierData} title={'Supplier'} supplier={inputFieldDetail?.supplier} handleSupplierDetail={handleSupplierDetail} handleModalClose={handleModalClose} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog open={itemModalOpen}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <div onClick={() => handleItemModalClose()} style={{ cursor: "pointer" }}>X</div>
              </div>
            </Grid>

            <Grid item lg={12} sm={12} md={12} xs={12}>
              <ItemDetailModal data={itemData} title={'Item'} itemName={saleItemDetail[currentIndex]?.itemName} handleSingleItemDetail={handleSingleItemDetail} handleItemModalClose={handleItemModalClose} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SaleEntry;