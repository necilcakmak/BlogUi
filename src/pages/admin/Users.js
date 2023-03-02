import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { Calendar } from "primereact/calendar";
import { httpService } from "../../tools/httpService";

const Users = () => {
  const [users, setUsers] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);

  const statuses = ["true", "false"];

  useEffect(() => {
    const users = async () => {
      const response = await httpService.get("user/getlist");
      if (response.success) {
        setUsers(response.data);
        setLoading(false);
      }
    };

    initFilters();
    users();
  }, []);

  const initFilters = () => {
    setFilters({
      firstName: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      createdDate: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      email: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      isActive: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      isApproved: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
  };

  const statusBodyTemplate = (rowData) => {
    const status = rowData.isActive ? "qualified" : "unqualified";
    return (
      <span className={`customer-badge status-${status}`}>
        {rowData.isActive.toString()}
      </span>
    );
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select a Status"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <i
        className={classNames("pi", {
          "text-green-500 pi-check-circle": rowData.isApproved,
          "text-pink-500 pi-times-circle": !rowData.isApproved,
        })}
      ></i>
    );
  };

  const verifiedFilterTemplate = (options) => {
    return (
      <TriStateCheckbox
        value={options.value}
        onChange={(e) => options.filterCallback(e.value)}
      />
    );
  };

  const formatDate = (value) => {
    return value.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const dateBodyTemplate = (rowData) => {
    return formatDate(new Date(rowData.createdDate));
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };

  return (
    <div className="grid table-demo">
      <div className="col-12">
        <div className="card">
          <h5>User List</h5>
          <DataTable
            value={users}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={10}
            dataKey="id"
            filters={filters}
            filterDisplay="menu"
            loading={loading}
            responsiveLayout="scroll"
            emptyMessage="No users found."
          >
            <Column
              field="firstName"
              header="Name"
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            />
            <Column
              field="email"
              header="Email"
              filter
              filterPlaceholder="Search by email"
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="CreatedDate"
              filterField="createdDate"
              dataType="date"
              style={{ minWidth: "10rem" }}
              body={dateBodyTemplate}
              filter
              filterElement={dateFilterTemplate}
            />
            <Column
              field="isActive"
              header="Status"
              filterMenuStyle={{ width: "14rem" }}
              style={{ minWidth: "12rem" }}
              body={statusBodyTemplate}
              filter
              filterElement={statusFilterTemplate}
            />
            <Column
              field="isApproved"
              header="Verified"
              dataType="boolean"
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={verifiedBodyTemplate}
              filter
              filterElement={verifiedFilterTemplate}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Users;
